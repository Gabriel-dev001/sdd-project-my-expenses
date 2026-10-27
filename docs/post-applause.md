# Rascunho do post — Applause (Valor Desenvolvimento)

**Título:** Estudo de SDD (Spec-Driven Development) com OpenSpec ✅

Concluí minha meta de estudar **Spec-Driven Development** e aplicá-lo em um projeto pessoal usando o **OpenSpec**.

🔎 **O que é SDD:** a especificação vem antes do código e continua sendo a fonte da verdade. Cada mudança começa com uma proposta (por quê), uma spec com cenários WHEN/THEN (o quê), um design (como) e uma lista de tasks, e só então vem a implementação.

🛠️ **O projeto:** um app web de controle de gastos pessoais (React + Vite + TypeScript), construído em duas changes do OpenSpec:
1. `add-expense-tracking`: registrar, listar, remover, totalizar e salvar gastos.
2. `add-category-filter`: filtro e resumo por categoria, descrito como **delta** sobre a spec existente (ADDED + MODIFIED).

📌 **Aprendizados:**
- Escrever cenários antes torna os testes quase automáticos (32 testes mapeados para a spec).
- Os deltas do OpenSpec deixam claro o que muda em cada entrega, inclusive em projetos que já existem.
- Com agentes de IA, a spec vira o "contrato" que evita o vibe coding.

🔗 Repositório: <LINK_DO_REPOSITORIO>
