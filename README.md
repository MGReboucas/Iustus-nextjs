# IUSTUS — Defesa Jurídica Online

Landing page da IUSTUS, uma plataforma por assinatura para solicitar, acompanhar e receber defesas jurídicas online de forma simples, organizada e acessível.

A proposta é oferecer uma jornada clara: a pessoa assina o produto, envia o caso, os documentos e a procuração pelo dashboard, acompanha cada etapa em um painel seguro e recebe sua defesa preparada — tudo em um só lugar.

## Proposta

Por **R$ 547 ao ano**, a pessoa cliente tem acesso ilimitado à plataforma durante a vigência da assinatura. O pagamento pode ser feito à vista ou dividido em **6 ou 12 vezes**.

Com a assinatura ativa, é possível enviar quantos casos forem necessários ao longo do ano, anexar os documentos e a procuração, acompanhar cada solicitação e receber as defesas pela própria plataforma.

## A landing page

A página apresenta:

- Proposta de valor e chamada para assinatura anual;
- Fluxo da plataforma em três etapas;
- Benefícios do acompanhamento digital;
- Plano anual de R$ 547, com opções de pagamento à vista, em 6x ou em 12x;
- Uso ilimitado da plataforma durante a vigência anual;
- Fluxo completo: assinatura, envio do caso e procuração, acompanhamento e recebimento da defesa;
- Perguntas frequentes;
- Layout responsivo para desktop e celular;
- Identidade visual IUSTUS: azul-marinho, dourado e linguagem premium.

## Tecnologias

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- CSS puro responsivo

## Como executar localmente

Instale as dependências:

```bash
npm install
```

Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

Depois, abra [http://localhost:3000](http://localhost:3000) no navegador.

## Build de produção

```bash
npm run build
npm start
```

## Checkout

A rota `/checkout` já contém a experiência de contratação: dados da pessoa cliente, escolha entre pagamento à vista, em 6x ou em 12x, resumo do plano e confirmação da etapa escolhida.

## PagBank

O checkout usa o **Checkout Transparente do PagBank**. O layout é próprio; a biblioteca oficial do PagBank cria a sessão, identifica a bandeira, consulta as condições de parcelamento e tokeniza o cartão antes da cobrança.

As parcelas, juros, valor de cada parcela e valor final são consultados pelo PagBank depois que o comprador informa o cartão. Esse cálculo depende da bandeira e das regras configuradas na conta vendedora, por isso não deve ser fixado no código.

Copie `.env.example` para `.env.local` e informe as credenciais da sua aplicação:

```bash
PAGBANK_EMAIL=seu-email-de-vendedor
PAGBANK_TOKEN=seu-token-de-integracao
NEXT_PUBLIC_PAGBANK_SANDBOX=true
```

`PAGBANK_EMAIL` e `PAGBANK_TOKEN` são privados e ficam exclusivamente no servidor. Use `NEXT_PUBLIC_PAGBANK_SANDBOX=false` somente depois de concluir os testes e a homologação.

Antes de publicar, configure a conta Mercado Pago em produção e substitua os modelos de depoimento da landing por avaliações reais e autorizadas.

## Estrutura do projeto

```text
app/
├── globals.css   # Estilos, responsividade e identidade visual
├── layout.js     # Metadados e estrutura raiz
└── page.js       # Landing page e interações
```

## Observação

O conteúdo da página tem finalidade institucional e de apresentação da plataforma. A comunicação jurídica, critérios de atendimento, escopo dos serviços, condições de parcelamento e fluxos de contratação devem ser revisados de acordo com a operação e a regulamentação aplicável.
