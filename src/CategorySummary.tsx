import { formatBRL, totalsByCategory, type Expense } from './expenses'

export function CategorySummary({ expenses }: { expenses: Expense[] }) {
  const totals = totalsByCategory(expenses)
  if (totals.length === 0) return null

  return (
    <section className="card" aria-label="Resumo por categoria">
      <h2>Por categoria</h2>
      <ul className="summary">
        {totals.map(({ category, cents }) => (
          <li key={category}>
            <span>{category}</span>
            <span className="amount">{formatBRL(cents)}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
