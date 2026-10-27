import { useState } from 'react'
import { CategorySummary } from './CategorySummary'
import { ExpenseForm } from './ExpenseForm'
import { ExpenseList } from './ExpenseList'
import type { CategoryFilter } from './expenses'
import { useExpenses } from './useExpenses'

function App() {
  const { expenses, addExpense, removeExpense } = useExpenses()
  const [filter, setFilter] = useState<CategoryFilter>('Todas')

  return (
    <main>
      <h1>Meus gastos</h1>
      <ExpenseForm onAdd={addExpense} />
      <ExpenseList
        expenses={expenses}
        filter={filter}
        onFilterChange={setFilter}
        onRemove={removeExpense}
      />
      <CategorySummary expenses={expenses} />
    </main>
  )
}

export default App
