import { describe, expect, it } from 'vitest'
import {
  STORAGE_KEY,
  filterByCategory,
  formatBRL,
  loadExpenses,
  parseAmountToCents,
  saveExpenses,
  sortByDateDesc,
  totalCents,
  totalsByCategory,
  validateExpense,
  type Expense,
  type ExpenseInput,
} from './expenses'

const input = (overrides: Partial<ExpenseInput> = {}): ExpenseInput => ({
  description: 'Almoço',
  amount: '32,50',
  category: 'Alimentação',
  date: '2026-10-20',
  ...overrides,
})

const expense = (overrides: Partial<Expense> = {}): Expense => ({
  id: crypto.randomUUID(),
  description: 'Gasto',
  amountCents: 1000,
  category: 'Outros',
  date: '2026-10-20',
  ...overrides,
})

describe('validateExpense', () => {
  it('aceita um gasto válido', () => {
    expect(validateExpense(input())).toBeNull()
  })

  it('rejeita descrição vazia ou só com espaços', () => {
    expect(validateExpense(input({ description: '   ' }))).toBe('Informe uma descrição')
  })

  it.each(['0', '-5', 'abc', ''])('rejeita valor %j', (amount) => {
    expect(validateExpense(input({ amount }))).toBe('Informe um valor maior que zero')
  })
})

describe('parseAmountToCents', () => {
  it.each([
    ['32,50', 3250],
    ['32.50', 3250],
    ['1.234,56', 123456],
    ['10', 1000],
  ])('%s → %i centavos', (amount, cents) => {
    expect(parseAmountToCents(amount)).toBe(cents)
  })
})

describe('sortByDateDesc', () => {
  it('ordena do mais recente para o mais antigo', () => {
    const older = expense({ date: '2026-10-18' })
    const newer = expense({ date: '2026-10-20' })
    expect(sortByDateDesc([older, newer])).toEqual([newer, older])
  })
})

describe('totalCents', () => {
  it('soma os gastos', () => {
    const total = totalCents([expense({ amountCents: 1000 }), expense({ amountCents: 2550 })])
    expect(formatBRL(total)).toBe(formatBRL(3550))
    expect(total).toBe(3550)
  })

  it('retorna zero sem gastos', () => {
    expect(totalCents([])).toBe(0)
  })
})

describe('persistência', () => {
  it('salva e carrega os gastos', () => {
    const list = [expense()]
    saveExpenses(list)
    expect(loadExpenses()).toEqual(list)
  })

  it('retorna lista vazia quando os dados estão corrompidos', () => {
    localStorage.setItem(STORAGE_KEY, '{não é json')
    expect(loadExpenses()).toEqual([])
  })
})

describe('filterByCategory', () => {
  const food = expense({ category: 'Alimentação' })
  const bus = expense({ category: 'Transporte' })

  it('retorna só a categoria selecionada', () => {
    expect(filterByCategory([food, bus], 'Transporte')).toEqual([bus])
  })

  it('retorna tudo com "Todas"', () => {
    expect(filterByCategory([food, bus], 'Todas')).toEqual([food, bus])
  })
})

describe('totalsByCategory', () => {
  it('agrupa e ordena do maior para o menor', () => {
    const list = [
      expense({ category: 'Alimentação', amountCents: 1000 }),
      expense({ category: 'Alimentação', amountCents: 500 }),
      expense({ category: 'Transporte', amountCents: 2000 }),
    ]
    expect(totalsByCategory(list)).toEqual([
      { category: 'Transporte', cents: 2000 },
      { category: 'Alimentação', cents: 1500 },
    ])
  })

  it('retorna vazio sem gastos', () => {
    expect(totalsByCategory([])).toEqual([])
  })
})
