# Proposal

## Why

Quero acompanhar meus gastos pessoais do dia a dia sem depender de planilhas ou apps com cadastro. Um app web simples, que roda no navegador e guarda os dados localmente, resolve isso com o mínimo de atrito.

## What Changes

- Novo formulário para registrar um gasto (descrição, valor, categoria e data).
- Lista de gastos registrados, do mais recente para o mais antigo.
- Remoção de um gasto da lista.
- Exibição do total gasto.
- Persistência dos gastos no navegador, para que sobrevivam a um recarregamento da página.

## Capabilities

### New Capabilities
- `expense-tracking`: registro, listagem, remoção, totalização e persistência local de gastos pessoais.

### Modified Capabilities

Nenhuma.

## Impact

- Substitui a página inicial gerada pelo Vite pela tela do controle de gastos (`src/App.tsx`).
- Adiciona Vitest e Testing Library como dependências de desenvolvimento.
- Sem backend, sem autenticação: os dados ficam apenas no `localStorage` do navegador.
