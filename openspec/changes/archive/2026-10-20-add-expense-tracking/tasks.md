# Tasks

## 1. Setup

- [x] 1.1 Instalar Vitest, @testing-library/react, @testing-library/jest-dom e jsdom; configurar `test` no `vite.config.ts` e script `npm test`; verificar que `npm test` roda sem erros
- [x] 1.2 Remover o conteúdo de exemplo do Vite (`App.css`, assets e contador) e verificar que `npm run build` passa

## 2. Domínio

- [x] 2.1 Criar `src/expenses.ts` com tipo `Expense`, `CATEGORIES`, `validateExpense`, `sortByDateDesc`, `totalCents` e `formatBRL`; cobrir os cenários de validação, ordenação e total em `src/expenses.test.ts` e verificar que os testes passam
- [x] 2.2 Adicionar `loadExpenses`/`saveExpenses` com chave `expenses:v1` e fallback para lista vazia em JSON inválido; verificar com testes de persistência e dados corrompidos

## 3. Interface

- [x] 3.1 Criar hook `useExpenses` (adicionar, remover, persistir a cada mudança) e verificar via teste de componente que um gasto adicionado sobrevive a um novo render com o mesmo storage
- [x] 3.2 Criar formulário de registro com data padrão de hoje e mensagens de erro da spec; verificar com teste de componente dos cenários "Registro válido", "Descrição vazia" e "Valor inválido"
- [x] 3.3 Criar lista com remoção, mensagem de lista vazia e total em BRL; verificar com teste de componente dos cenários "Remoção", "Lista vazia" e "Soma dos gastos"
- [x] 3.4 Estilizar a tela (layout simples, responsivo) e verificar visualmente com `npm run dev`

## 4. Integração

- [x] 4.1 Rodar `npm test`, `npm run lint` e `npm run build` e verificar que todos passam
- [x] 4.2 Atualizar o README descrevendo o projeto e o fluxo OpenSpec usado

## Workflow follow-up

- Arquivar a change com `openspec archive add-expense-tracking` após a revisão.
