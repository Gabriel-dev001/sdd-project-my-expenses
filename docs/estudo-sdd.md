# Resumo de estudo — SDD e OpenSpec

## Spec-Driven Development (SDD)

- **Ideia central:** a especificação vem antes do código e continua sendo a fonte da verdade. O código é uma consequência da spec, não o contrário.
- **Por que agora:** com agentes de IA escrevendo código, o gargalo deixa de ser digitar e passa a ser **dizer com precisão o que se quer**. Prompts soltos geram "vibe coding": o resultado funciona, mas ninguém sabe exatamente qual comportamento foi combinado.
- **Spec ≠ design:** a spec descreve comportamento observável (entradas, saídas, erros, cenários). Nomes de classes, bibliotecas e passos de implementação ficam no design e nas tasks.
- **Cenários testáveis:** cada requisito tem cenários WHEN/THEN, que viram testes quase 1:1.
- **Benefícios:** alinhamento antes de codar, revisão mais fácil (revisa-se a intenção, não só o diff), histórico de decisões e menos retrabalho com IA.
- **Custos:** exige disciplina para manter a spec atualizada; em mudanças triviais o ritual pode ser maior que o ganho.

## OpenSpec

- CLI leve (`npm i -g @fission-ai/openspec`) que organiza o SDD dentro do repositório e se integra a agentes como Claude Code, Cursor e Copilot (comandos `/opsx:*`).
- **Duas pastas:**
  - `openspec/specs/` — o estado atual do sistema (fonte da verdade).
  - `openspec/changes/` — mudanças em andamento, cada uma com `proposal.md` (por quê), `specs/` (delta: o quê), `design.md` (como) e `tasks.md` (passos).
- **Deltas:** a change descreve só o que muda: `ADDED`, `MODIFIED`, `REMOVED`, `RENAMED`. Isso é o diferencial para projetos existentes (brownfield), já que não é preciso reescrever a spec inteira.
- **Ciclo:** `propose → validate → apply → archive`. No `archive`, o delta é mesclado em `openspec/specs/` e a change vai para `changes/archive/AAAA-MM-DD-nome/`.
- `openspec validate --strict` garante requisitos com SHALL/MUST e pelo menos um cenário cada.

## O que observei na prática (este projeto)

- A change 1 criou a capability `expense-tracking` com 6 requisitos e 12 cenários.
- A change 2 mostrou o poder do delta: 2 requisitos `ADDED` e 1 `MODIFIED` ("Exibir total" passou a respeitar o filtro), sem tocar no resto.
- Escrever os cenários antes deixou os testes óbvios: 32 testes, quase todos mapeados para um cenário.
- O `design.md` foi útil para registrar escolhas que não são comportamento (valores em centavos, chave versionada no localStorage).
