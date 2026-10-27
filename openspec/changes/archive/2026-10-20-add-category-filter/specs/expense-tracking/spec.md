# Spec Delta

## ADDED Requirements

### Requirement: Filtrar por categoria
O sistema SHALL permitir filtrar a lista de gastos por categoria, com a opção "Todas" selecionada por padrão.

#### Scenario: Filtro aplicado
- **WHEN** existem gastos de "Alimentação" e "Transporte" e o usuário seleciona "Transporte"
- **THEN** apenas os gastos de "Transporte" aparecem na lista

#### Scenario: Categoria sem gastos
- **WHEN** o usuário seleciona uma categoria que não possui gastos
- **THEN** o sistema exibe a mensagem "Nenhum gasto nesta categoria"

#### Scenario: Voltar para todas
- **WHEN** o usuário seleciona "Todas"
- **THEN** todos os gastos voltam a aparecer

### Requirement: Resumo por categoria
O sistema SHALL exibir o total gasto em cada categoria que possua ao menos um gasto, ordenado do maior para o menor valor, independentemente do filtro selecionado.

#### Scenario: Totais por categoria
- **WHEN** existem gastos de R$ 10,00 e R$ 5,00 em "Alimentação" e R$ 20,00 em "Transporte"
- **THEN** o resumo mostra "Transporte" com R$ 20,00 seguido de "Alimentação" com R$ 15,00

#### Scenario: Sem gastos
- **WHEN** não há gastos registrados
- **THEN** o resumo por categoria não é exibido

## MODIFIED Requirements

### Requirement: Exibir total
O sistema SHALL exibir a soma dos valores dos gastos listados, formatada em reais (BRL). Quando houver filtro de categoria, o total MUST considerar apenas os gastos da categoria selecionada.

#### Scenario: Soma dos gastos
- **WHEN** existem gastos de R$ 10,00 e R$ 25,50
- **THEN** o total exibido é R$ 35,50

#### Scenario: Total sem gastos
- **WHEN** não há gastos registrados
- **THEN** o total exibido é R$ 0,00

#### Scenario: Total com filtro
- **WHEN** existem gastos de R$ 10,00 em "Lazer" e R$ 25,50 em "Saúde" e o filtro "Lazer" está selecionado
- **THEN** o total exibido é R$ 10,00
