# Design

## Context

Implementação atual descrita na spec `expense-tracking`; lógica de domínio em `src/expenses.ts` e UI em `ExpenseForm`/`ExpenseList`. Requisitos novos em `specs/expense-tracking/spec.md` desta change.

## Goals / Non-Goals

**Goals:**
- Filtro e agrupamento como funções puras testáveis (`filterByCategory`, `totalsByCategory`).

**Non-Goals:**
- Persistir o filtro selecionado entre recarregamentos.
- Gráficos.

## Decisions

- **Estado do filtro local em `App`** e passado para a lista: é estado de visualização, não de domínio, então não entra no `useExpenses` nem no `localStorage`.
- **`totalsByCategory` retorna lista ordenada** (`{ category, cents }[]`) em vez de objeto: a UI só precisa iterar na ordem certa.
- **Resumo independe do filtro**: mostra a visão geral; o total do cabeçalho é que reflete o filtro.

## Risks / Trade-offs

- [Filtro não persistido] → Comportamento esperado para um filtro de visualização; pode virar change futura se fizer falta.
