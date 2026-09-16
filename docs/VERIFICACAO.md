# Verificação da documentação

> Registro da revisão e organização do repositório em 16/09/2026. Verificações locais de documentação e fundação não equivalem a homologação produtiva.

## Escopo

Conferir inventário contra arquivos locais, preservar o texto original, revisar coerência entre requisitos, regras, arquitetura, permissões, banco, API, backlog e cronograma. Documentos gerados usam a mesma fonte de catálogos e estimativas para evitar números divergentes. Na organização autorizada, mover o frontend preservando conteúdo e histórico, criar fundação Django e verificar os comandos nos novos diretórios.

## Verificações reproduzíveis

```bash
node --check docs/planejamento/dados.cjs
node --check docs/planejamento/gerar.cjs
node --check docs/planejamento/verificar.cjs
node docs/planejamento/gerar.cjs --check
node docs/planejamento/verificar.cjs
git diff --check
```

O gerador verifica IDs únicos, cobertura de todos os requisitos/regras por tarefas, dependências anteriores, fases em ordem, capacidade de 1 desenvolvedor/8h/dia, somas, reservas e ausência de sobreposição. A conferência adicional verifica links locais, referências a IDs, blocos Markdown fechados, documentos presentes no índice e no README e cálculo independente da data final.

As quebras de linha por dois espaços no documento original são sintaxe Markdown intencional; foram preservadas. Para revisão Git desse arquivo, permitir whitespace de Markdown, sem remover conteúdo original apenas para satisfazer o linter.

## Resultado desta versão

Catálogo revisado após aprovação do backend Django/DRF com frontend Next.js/TypeScript, preservando a atuação civil completa: 43 requisitos funcionais, 18 não funcionais, 25 regras, 43 histórias e 64 tarefas. Soma: 1360h técnicas + 336h de reserva = 1696h, ou 212 dias de capacidade. Início-base 16/09/2026 e término-base 08/07/2027, com calendário provisório seg–sex sem feriados/ausências descontados. Marcos intermediários e cálculos completos no [Cronograma](CRONOGRAMA.md). Esta revisão acrescentou 80h técnicas e 24h de reserva à previsão imediatamente anterior de 1592h; não representa trabalho já executado.

Verificação documental ampliada aos guias de frontend/backend/infra/tests: 48 arquivos Markdown, 155 links locais existentes, 7 blocos Mermaid fechados e cálculo independente de 212 dias até 08/07/2027. A organização inicial não altera a estimativa integral nem declara tarefas aceitas; uma previsão de esforço restante exigirá reavaliar os critérios já cumpridos. Os dados correntes e sincronizados ficam em [Resumo executivo](RESUMO_EXECUTIVO.md).

## Verificações da estrutura criada

- Migração física dos 14 arquivos originais de aplicação/referência conferida por SHA-256 antes e depois do movimento; HEAD Git inalterado. `.git` permaneceu na raiz, sem novo repositório ou commit.
- Dependências de runtime Next.js/React preservadas; TypeScript e tipos adicionados ao lockfile do frontend.
- `npm run build` passou pela raiz, usando frontend/. Há um aviso no CSS original de acesso: valor `start` com suporte misto, sugestão `flex-start`; os estilos foram preservados.
- `npm run typecheck` passou. A adoção é incremental: JavaScript existente usa checkJs=false e não foi convertido automaticamente.
- Django `check` sem problemas e `makemigrations --check --dry-run` sem divergência. Seis testes da fundação passaram em SQLite em memória, executados dentro de backend/.
- Ambiente local de verificação: Node 24.14.1 e Python 3.14.3; Django 5.2.17 e DRF 3.18.1 travados no requirements.lock.
- Workflow CI criado para frontend, backend e documentos; execução remota no GitHub ainda não ocorreu.

## Limites e pendências

- Aprovação do MVP, regras e hipóteses por produto/operação ainda pendente.
- Fornecedores, custos, calendário efetivo e responsáveis nominais ainda pendentes.
- PostgreSQL/Compose, integração PagBank, scanner, restauração, E2E e homologação do produto não foram executados nesta organização. Docker não está disponível neste ambiente.
- Diagramas Mermaid tiveram estrutura textual revisada; não houve validação visual em renderizador Mermaid.
- Links externos são referências consultadas; o verificador local não testa disponibilidade da internet.
- O scaffold local foi implementado; as funcionalidades jurídicas/financeiras existentes não foram alteradas. Nenhum commit, cobrança ou deploy foi realizado.

O código financeiro mantém os achados AT-01 a AT-04 até que as tarefas de implementação sejam autorizadas e executadas. As datas são estimativas condicionais, não compromisso comercial.
