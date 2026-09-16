# Verificação da documentação e do incremento

> Evidências de 16/09/2026. Testes locais não equivalem a homologação produtiva.

## Planejamento

A fonte canônica conserva 43 requisitos funcionais, 18 não funcionais, 25 regras, 43 histórias e 64 tarefas. Baseline integral: 1360h técnicas + 336h de reserva = 1696h, 212 dias úteis de referência; início 16/09/2026 e término 08/07/2027, sem descontar feriados e ausências. Este incremento não recalcula automaticamente esforço restante nem declara aceite integral. [Cronograma](CRONOGRAMA.md) · [Resumo](RESUMO_EXECUTIVO.md).

Gerador e verificador conferem catálogos, cobertura, dependências, links locais, blocos Markdown/Mermaid, índice e cálculo independente do prazo. Executar na raiz:

~~~bash
node docs/planejamento/gerar.cjs --check
node docs/planejamento/verificar.cjs
git diff --check
~~~

O texto de [Diretrizes originais](DIRETRIZES_ORIGINAIS.md) permanece preservado, inclusive quebras Markdown intencionais. As contagens de arquivos/links atuais são emitidas pelo verificador.

## Evidências técnicas

- A organização anterior preservou 14 arquivos por SHA-256 e o histórico; foi publicada no commit 4b8d21f. Neste incremento, acesso e dependências foram alterados intencionalmente; landing e código financeiro permanecem preservados.
- Build Next.js 15.5.25 / React 19.1.9 e verificação TypeScript local. Há aviso de CSS sobre valor start, sem falha de compilação.
- Django check e verificação de migrações sem divergência; 22 testes no PostgreSQL isolado, incluindo consumo concorrente do mesmo TOTP. SQLite é alternativa parcial e pula esse teste de locks.
- Três jornadas de navegador verificam cliente, equipe e isolamento com dados sintéticos. Comandos e bancos separados: [Acesso local](ACESSO.md).
- Ambiente verificado: Node 24.14.1, Python 3.14.3, Django 5.2.17, DRF 3.18.1 e PostgreSQL 18.6. CI configurado com PostgreSQL 17 e Chromium; resultado local não comprova execução remota.

## Limites

PagBank, SMTP externo, scanner, restauração, carga, auditoria de segurança completa, subdomínios reais e deploy não foram homologados. Nenhuma cobrança ou mensagem externa foi enviada. Os achados financeiros AT-01 a AT-04 continuam em aberto. Aprovação de políticas, fornecedores, custos e calendário efetivo permanece pendente. Diagramas Mermaid tiveram validação textual; links externos não são testados pelo verificador local.
