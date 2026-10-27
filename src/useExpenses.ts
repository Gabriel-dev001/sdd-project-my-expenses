import { useEffect, useState } from 'react'
import { loadExpenses, saveExpenses, type Expense } from './expenses'

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>(() => loadExpenses())

  useEffect(() => {
    saveExpenses(expenses)
  }, [expenses])

  const addExpense = (expense: Omit<Expense, 'id'>) =>
    setExpenses((list) => [...list, { ...expense, id: crypto.randomUUID() }])

  const removeExpense = (id: string) => setExpenses((list) => list.filter((e) => e.id !== id))

  return { expenses, addExpense, removeExpense }
}
