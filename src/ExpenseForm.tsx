import { useState, type FormEvent } from 'react'
import {
  CATEGORIES,
  parseAmountToCents,
  todayISO,
  validateExpense,
  type Category,
  type Expense,
} from './expenses'

type Props = {
  onAdd: (expense: Omit<Expense, 'id'>) => void
}

export function ExpenseForm({ onAdd }: Props) {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState<Category>(CATEGORIES[0])
  const [date, setDate] = useState(todayISO())
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const validation = validateExpense({ description, amount, category, date })
    setError(validation)
    if (validation) return
    onAdd({
      description: description.trim(),
      amountCents: parseAmountToCents(amount),
      category,
      date,
    })
    setDescription('')
    setAmount('')
    setCategory(CATEGORIES[0])
    setDate(todayISO())
  }

  return (
    <form className="card form" onSubmit={handleSubmit} noValidate>
      <h2>Novo gasto</h2>
      <label>
        Descrição
        <input value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <div className="row">
        <label>
          Valor (R$)
          <input inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </label>
        <label>
          Data
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
      </div>
      <label>
        Categoria
        <select value={category} onChange={(e) => setCategory(e.target.value as Category)}>
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </label>
      {error && (
        <p role="alert" className="error">
          {error}
        </p>
      )}
      <button type="submit">Adicionar</button>
    </form>
  )
}
