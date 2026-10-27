# Spec Delta

## Purpose

Permite que uma pessoa registre e acompanhe seus gastos pessoais no navegador, vendo a lista de gastos e o total gasto.

## ADDED Requirements

### Requirement: Registrar gasto
O sistema SHALL permitir registrar um gasto informando descrição, valor, categoria e data. A categoria MUST ser uma de: Alimentação, Transporte, Moradia, Lazer, Saúde, Outros.

#### Scenario: Registro válido
- **WHEN** o usuário preenche descrição "Almoço", valor 32,50, categoria "Alimentação" e data 2026-10-20 e confirma
- **THEN** o gasto aparece na lista com esses dados
- **AND** o formulário é limpo para um novo registro

#### Scenario: Data padrão
- **WHEN** o usuário abre o formulário
- **THEN** o campo de data vem preenchido com a data de hoje

### Requirement: Validar gasto
O sistema MUST rejeitar o registro quando a descrição estiver vazia (ou só com espaços) ou quando o valor não for um número maior que zero, exibindo uma mensagem de erro e sem alterar a lista.

#### Scenario: Descrição vazia
- **WHEN** o usuário confirma o formulário com a descrição em branco
- **THEN** o sistema exibe a mensagem "Informe uma descrição"
- **AND** nenhum gasto é adicionado

#### Scenario: Valor inválido
- **WHEN** o usuário confirma o formulário com valor 0 ou negativo
- **THEN** o sistema exibe a mensagem "Informe um valor maior que zero"
- **AND** nenhum gasto é adicionado

### Requirement: Listar gastos
O sistema SHALL exibir os gastos registrados ordenados por data, do mais recente para o mais antigo, mostrando descrição, categoria, data e valor formatado em reais (BRL).

#### Scenario: Ordenação por data
- **WHEN** existem gastos nas datas 2026-10-18 e 2026-10-20
- **THEN** o gasto de 2026-10-20 aparece antes do de 2026-10-18

#### Scenario: Lista vazia
- **WHEN** não há gastos registrados
- **THEN** o sistema exibe a mensagem "Nenhum gasto registrado"

### Requirement: Remover gasto
O sistema SHALL permitir remover um gasto individual da lista.

#### Scenario: Remoção
- **WHEN** o usuário clica em remover em um gasto
- **THEN** esse gasto deixa de aparecer na lista e no total

### Requirement: Exibir total
O sistema SHALL exibir a soma dos valores de todos os gastos listados, formatada em reais (BRL).

#### Scenario: Soma dos gastos
- **WHEN** existem gastos de R$ 10,00 e R$ 25,50
- **THEN** o total exibido é R$ 35,50

#### Scenario: Total sem gastos
- **WHEN** não há gastos registrados
- **THEN** o total exibido é R$ 0,00

### Requirement: Persistir gastos localmente
O sistema MUST manter os gastos salvos no navegador, de modo que continuem disponíveis após recarregar a página.

#### Scenario: Recarregar a página
- **WHEN** o usuário registra um gasto e recarrega a página
- **THEN** o gasto continua aparecendo na lista

#### Scenario: Dados corrompidos
- **WHEN** os dados salvos no navegador estão ilegíveis
- **THEN** o sistema inicia com a lista vazia, sem quebrar a tela
