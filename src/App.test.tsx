import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'
import { formatBRL as formatRaw, todayISO } from './expenses'

const formatBRL = (cents: number) => formatRaw(cents).replace(/\s/g, ' ')

async function addExpense(description: string, amount: string, date?: string, category?: string) {
  const user = userEvent.setup()
  if (category) await user.selectOptions(screen.getByLabelText('Categoria'), category)
  if (description) await user.type(screen.getByLabelText('Descrição'), description)
  if (amount) await user.type(screen.getByLabelText('Valor (R$)'), amount)
  if (date) {
    await user.clear(screen.getByLabelText('Data'))
    await user.type(screen.getByLabelText('Data'), date)
  }
  await user.click(screen.getByRole('button', { name: 'Adicionar' }))
}

describe('App', () => {
  it('preenche a data com hoje por padrão', () => {
    render(<App />)
    expect(screen.getByLabelText('Data')).toHaveValue(todayISO())
  })

  it('registra um gasto válido e limpa o formulário', async () => {
    render(<App />)
    await addExpense('Almoço', '32,50', '2026-10-20')

    const item = screen.getByText('Almoço').closest('li')!
    expect(within(item).getByText('Alimentação · 20/10/2026')).toBeInTheDocument()
    expect(within(item).getByText(formatBRL(3250))).toBeInTheDocument()
    expect(screen.getByLabelText('Descrição')).toHaveValue('')
    expect(screen.getByLabelText('Valor (R$)')).toHaveValue('')
  })

  it('mostra erro com descrição vazia', async () => {
    render(<App />)
    await addExpense('', '10')
    expect(screen.getByRole('alert')).toHaveTextContent('Informe uma descrição')
    expect(screen.getByText('Nenhum gasto registrado')).toBeInTheDocument()
  })

  it('mostra erro com valor inválido', async () => {
    render(<App />)
    await addExpense('Café', '0')
    expect(screen.getByRole('alert')).toHaveTextContent('Informe um valor maior que zero')
    expect(screen.getByText('Nenhum gasto registrado')).toBeInTheDocument()
  })

  it('mostra lista vazia e total zerado sem gastos', () => {
    render(<App />)
    expect(screen.getByText('Nenhum gasto registrado')).toBeInTheDocument()
    expect(screen.getByTestId('total')).toHaveTextContent(formatBRL(0))
  })

  it('soma os gastos e remove um gasto', async () => {
    render(<App />)
    await addExpense('Ônibus', '10')
    await addExpense('Cinema', '25,50')
    expect(screen.getByTestId('total')).toHaveTextContent(formatBRL(3550))

    await userEvent.click(screen.getByRole('button', { name: 'Remover Cinema' }))
    expect(screen.queryByText('Cinema')).not.toBeInTheDocument()
    expect(screen.getByTestId('total')).toHaveTextContent(formatBRL(1000))
  })

  it('mantém os gastos após recarregar', async () => {
    const { unmount } = render(<App />)
    await addExpense('Aluguel', '1500')
    unmount()

    render(<App />)
    expect(screen.getByText('Aluguel')).toBeInTheDocument()
  })

  describe('filtro por categoria', () => {
    async function seed() {
      render(<App />)
      await addExpense('Almoço', '10', undefined, 'Alimentação')
      await addExpense('Ônibus', '25,50', undefined, 'Transporte')
    }

    const selectFilter = (value: string) =>
      userEvent.selectOptions(screen.getByLabelText('Filtrar por categoria'), value)

    it('começa em "Todas"', async () => {
      await seed()
      expect(screen.getByLabelText('Filtrar por categoria')).toHaveValue('Todas')
    })

    it('mostra só a categoria selecionada e ajusta o total', async () => {
      await seed()
      await selectFilter('Transporte')
      expect(screen.queryByText('Almoço')).not.toBeInTheDocument()
      expect(screen.getByText('Ônibus')).toBeInTheDocument()
      expect(screen.getByTestId('total')).toHaveTextContent(formatBRL(2550))
    })

    it('avisa quando a categoria não tem gastos', async () => {
      await seed()
      await selectFilter('Lazer')
      expect(screen.getByText('Nenhum gasto nesta categoria')).toBeInTheDocument()
    })

    it('volta a mostrar tudo em "Todas"', async () => {
      await seed()
      await selectFilter('Transporte')
      await selectFilter('Todas')
      expect(screen.getByText('Almoço')).toBeInTheDocument()
      expect(screen.getByText('Ônibus')).toBeInTheDocument()
    })
  })

  describe('resumo por categoria', () => {
    it('mostra totais do maior para o menor, independente do filtro', async () => {
      render(<App />)
      await addExpense('Almoço', '10', undefined, 'Alimentação')
      await addExpense('Lanche', '5', undefined, 'Alimentação')
      await addExpense('Ônibus', '20', undefined, 'Transporte')
      await userEvent.selectOptions(screen.getByLabelText('Filtrar por categoria'), 'Alimentação')

      const rows = within(screen.getByRole('region', { name: 'Resumo por categoria' })).getAllByRole('listitem')
      expect(rows.map((r) => r.textContent?.replace(/\s/g, ' '))).toEqual([
        `Transporte${formatBRL(2000)}`,
        `Alimentação${formatBRL(1500)}`,
      ])
    })

    it('fica oculto sem gastos', () => {
      render(<App />)
      expect(screen.queryByRole('region', { name: 'Resumo por categoria' })).not.toBeInTheDocument()
    })
  })
})
