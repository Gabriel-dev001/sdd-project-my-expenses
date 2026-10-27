export const CATEGORIES = [
  'Alimentação',
  'Transporte',
  'Moradia',
  'Lazer',
  'Saúde',
  'Outros',
] as const

export type Category = (typeof CATEGORIES)[number]

export type Expense = {
  id: string
  description: string
  amountCents: number
  category: Category
  date: string
}

export type ExpenseInput = {
  description: string
  amount: string
  category: Category
  date: string
}

export const STORAGE_KEY = 'expenses:v1'

export function parseAmountToCents(amount: string): number {
  const trimmed = amount.trim()
  if (!trimmed) return NaN
  const normalized = trimmed.includes(',') ? trimmed.replace(/\./g, '').replace(',', '.') : trimmed
  const value = Number(normalized)
  return Number.isFinite(value) ? Math.round(value * 100) : NaN
}

export function validateExpense(input: ExpenseInput): string | null {
  if (!input.description.trim()) return 'Informe uma descrição'
  const cents = parseAmountToCents(input.amount)
  if (!Number.isFinite(cents) || cents <= 0) return 'Informe um valor maior que zero'
  return null
}

export function sortByDateDesc(expenses: Expense[]): Expense[] {
  return [...expenses].sort((a, b) => b.date.localeCompare(a.date))
}

export function totalCents(expenses: Expense[]): number {
  return expenses.reduce((sum, e) => sum + e.amountCents, 0)
}

const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

export function formatBRL(cents: number): string {
  return brl.format(cents / 100)
}

export function formatDate(date: string): string {
  const [y, m, d] = date.split('-')
  return `${d}/${m}/${y}`
}

export function todayISO(now = new Date()): string {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
}

export function loadExpenses(storage: Storage = localStorage): Expense[] {
  try {
    const raw = storage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as Expense[]) : []
  } catch {
    return []
  }
}

export function saveExpenses(expenses: Expense[], storage: Storage = localStorage): void {
  storage.setItem(STORAGE_KEY, JSON.stringify(expenses))
}

export type CategoryFilter = Category | 'Todas'

export function filterByCategory(expenses: Expense[], filter: CategoryFilter): Expense[] {
  return filter === 'Todas' ? expenses : expenses.filter((e) => e.category === filter)
}

export function totalsByCategory(expenses: Expense[]): { category: Category; cents: number }[] {
  const totals = new Map<Category, number>()
  for (const e of expenses) totals.set(e.category, (totals.get(e.category) ?? 0) + e.amountCents)
  return [...totals].map(([category, cents]) => ({ category, cents })).sort((a, b) => b.cents - a.cents)
}
