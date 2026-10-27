import {
  CATEGORIES,
  filterByCategory,
  formatBRL,
  formatDate,
  sortByDateDesc,
  totalCents,
  type CategoryFilter,
  type Expense,
} from './expenses'

type Props = {
  expenses: Expense[]
  filter: CategoryFilter
  onFilterChange: (filter: CategoryFilter) => void
  onRemove: (id: string) => void
}

export function ExpenseList({ expenses, filter, onFilterChange, onRemove }: Props) {
  const visible = filterByCategory(expenses, filter)
  const emptyMessage = expenses.length === 0 ? 'Nenhum gasto registrado' : 'Nenhum gasto nesta categoria'

  return (
    <section className="card">
      <div className="total">
        <span>Total</span>
        <strong data-testid="total">{formatBRL(totalCents(visible))}</strong>
      </div>
      <label className="filter">
        Filtrar por categoria
        <select value={filter} onChange={(e) => onFilterChange(e.target.value as CategoryFilter)}>
          <option>Todas</option>
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </label>
      {visible.length === 0 ? (
        <p className="empty">{emptyMessage}</p>
      ) : (
        <ul className="list">
          {sortByDateDesc(visible).map((e) => (
            <li key={e.id}>
              <div>
                <span className="description">{e.description}</span>
                <span className="meta">
                  {e.category} · {formatDate(e.date)}
                </span>
              </div>
              <span className="amount">{formatBRL(e.amountCents)}</span>
              <button
                type="button"
                className="remove"
                aria-label={`Remover ${e.description}`}
                onClick={() => onRemove(e.id)}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
