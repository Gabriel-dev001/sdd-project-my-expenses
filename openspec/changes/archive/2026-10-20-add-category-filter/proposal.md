# Proposal

## Why

Com a lista crescendo, fica difícil saber para onde o dinheiro está indo. Ver os gastos de uma categoria específica e o total por categoria responde isso rapidamente.

## What Changes

- Novo seletor de filtro por categoria acima da lista ("Todas" + as categorias existentes).
- A lista e o total passam a considerar apenas os gastos da categoria selecionada.
- Novo resumo com o total de cada categoria que possui gastos.

## Capabilities

### New Capabilities

Nenhuma.

### Modified Capabilities
- `expense-tracking`: o requisito "Exibir total" passa a respeitar o filtro; novos requisitos de filtro por categoria e resumo por categoria.

## Impact

- `src/expenses.ts`: novas funções puras de filtro e agrupamento.
- `src/ExpenseList.tsx` e novo componente de resumo por categoria.
- Sem mudança no formato salvo no `localStorage`.
