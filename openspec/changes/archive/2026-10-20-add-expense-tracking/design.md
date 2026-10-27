# Design

## Context

Projeto novo criado com Vite + React + TypeScript, sem nenhuma lógica de negócio ainda. Não há backend; tudo roda no navegador. Requisitos em `specs/expense-tracking/spec.md`.

## Goals / Non-Goals

**Goals:**
- Manter a lógica de domínio (validação, ordenação, total, persistência) em funções puras, testáveis sem renderizar a UI.
- UI mínima e acessível (labels nos campos, botões com nome).

**Non-Goals:**
- Edição de gastos, múltiplas moedas, sincronização entre dispositivos.
- Biblioteca de estado global ou de UI.

## Decisions

- **Valores em centavos (inteiros)**: evita erros de ponto flutuante na soma. Alternativa: `number` decimal — descartada por arredondamentos como 0,1 + 0,2.
- **Módulo `src/expenses.ts` com funções puras** (`validateExpense`, `sortByDateDesc`, `totalCents`, `loadExpenses`, `saveExpenses`) e um hook `useExpenses` que orquestra estado + persistência. Alternativa: tudo no componente — descartada por dificultar testes.
- **`localStorage` com chave versionada** (`expenses:v1`): permite migrar o formato no futuro. Leitura protegida por `try/catch`, retornando lista vazia em caso de JSON inválido.
- **Formatação com `Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })`**: nativo, sem dependência extra.
- **Testes com Vitest + Testing Library (jsdom)**: integra nativamente com Vite.
- **IDs com `crypto.randomUUID()`**: disponível em navegadores modernos e no jsdom.

## Risks / Trade-offs

- [Dados só no navegador; limpar o cache apaga tudo] → Aceitável para um app pessoal de estudo; exportação pode virar uma change futura.
- [Datas como string `YYYY-MM-DD`] → Ordenação lexicográfica funciona corretamente para esse formato; evita problemas de fuso horário com `Date`.
