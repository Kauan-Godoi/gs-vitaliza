# GS Vitaliza — contexto do projeto

Site da **GS Vitaliza Estofados**, higienização de estofados a domicílio em Taboão da Serra/SP. Domínio: `gsvitaliza.com.br`.
Desenvolvedor: Kauan Godoi Soares. Dono da empresa: **Cal** (Carlos Eduardo Godoi Soares), com cerca de 1 ano e meio de experiência em set/2026. Sempre tratar como "Cal" no site.
Todo o conteúdo do site e a comunicação com o usuário são em **português do Brasil**.

## Estado atual (out/2026)

- O site novo foi refeito do zero em **Astro** e está na **branch `redesign`**, enviada para `origin/redesign`.
- **Ainda NÃO foi mesclado na `main` e o usuário pediu para NÃO publicar ainda.** O site no ar continua sendo o antigo (template Bootstrap) da `main`. Não fazer merge, push na `main` ou abrir PR sem pedido explícito.
- `git checkout main` mostra o site antigo; `git checkout redesign` volta para o novo.
- As alterações antigas não commitadas da `main` foram descartadas a pedido do usuário.

## Comandos

```bash
npm install        # dependências (Node 22+; local usa Node 25)
npm run dev        # http://localhost:4321
npm run build      # gera dist/
npm run preview    # serve dist/ localmente
npx astro check    # checagem de tipos (deve dar 0 erros)
npm run reviews    # busca avaliações do Google (só funciona com as credenciais em variáveis de ambiente)
```

## Estrutura

| Caminho | O quê |
| --- | --- |
| `src/data/site.ts` | **Fonte única dos dados do negócio**: telefone/WhatsApp, Instagram, dono, endereço, cidades atendidas, horários, formas de pagamento, nota e links do Google, Formspree, serviços, "por que escolher", passos do processo e perguntas frequentes |
| `src/data/results.ts` | Pares de antes/depois (fotos em `src/assets/resultados/`, nomes `<item>-antes` / `<item>-depois`). Cards verticais 3:4, 3 por linha (flex, última linha centralizada). Sem foto, o site mostra um espaço reservado listrado |
| `src/data/reviews.json` | Avaliações do carrossel. **Vazio de propósito**: nunca inserir avaliações inventadas. Com o arquivo vazio, a seção mostra só o selo e um botão para o perfil no Google |
| `src/components/sections/*.astro` | Seções da home, nesta ordem: Hero, Services, WhyUs, Process, Results, Reviews, About, Faq, BlogTeaser, Contact |
| `src/components/` | Header (pílula flutuante; prop `overlay` só na home), Footer, Icon (SVGs inline), BeforeAfter (comparador), PostCard, WhatsAppFloat |
| `src/layouts/BaseLayout.astro` | `<head>`, SEO/OG e dados estruturados `HomeAndConstructionBusiness`. Prop `overlayHeader` para o hero escuro |
| `src/content/blog/*.md` | Artigos do blog (schema em `src/content.config.ts`: title, description, date, cover, coverAlt, draft) |
| `src/pages/` | `index.astro` (com dados estruturados de FAQ), `blog/index.astro`, `blog/[id].astro`, `404.astro` |
| `src/assets/brand/` | `logo.png` (logo recortada), `cal-recorte.png` (foto do Cal sem fundo, 1180×1656, margens transparentes cortadas; enquadrada no CSS do Hero com `height: 90%`), `hero.jpeg` |
| `src/assets/portfolio/` | Fotos da galeria e dos cards de serviço (`07.jpg`, a cadeirinha rasgada, não é usada de propósito) |
| `scripts/fetch-reviews.mjs` | Busca **todas** as avaliações pela API do Perfil da Empresa no Google e grava em `reviews.json` |
| `.github/workflows/deploy.yml` | Build + deploy no GitHub Pages; roda a cada push na `main` e diariamente às 09:00 UTC (para atualizar as avaliações) |
| `public/CNAME` | `gsvitaliza.com.br` |

## Convenções e armadilhas

- **CSS com escopo do Astro não alcança elementos de componentes filhos.** Para estilizar o `<img>` gerado por `<Image>` ou o `<svg>` do `<Icon>`, use `:global(img)` / `:global(.classe)`. Esse bug já aconteceu várias vezes.
- `aspect-ratio` num container sem `overflow: hidden` deixa a imagem esticar o container. Use `overflow: hidden` ou imagem `position: absolute; inset: 0`.
- Cores e tokens ficam em `src/styles/global.css` (`--blue-*`, `--header-h: 76px`, etc.). Botões: `.btn--whatsapp`, `--primary`, `--light`, `--ghost`, `--outline`.
- Ícones: adicione novos no objeto `paths` de `Icon.astro` (traço no estilo Lucide; os preenchidos ficam em `filled`).
- Content collections no Astro v7: `glob` vem de `astro/loaders`, `z` de `astro/zod` e `render` de `astro:content`.
- Mantenha nome, telefone, área e horário **iguais ao Perfil da Empresa no Google** (o Google cruza essas informações).
- Animação `.reveal` só aparece com JS. Respeite `prefers-reduced-motion`.
- Screenshots com Chrome headless: a janela tem largura mínima de ~500px. Para testar mobile (390px), renderize dentro de um `<iframe>` de 390px.

## Dados confirmados pelo cliente

- Horário: seg–sex 7h–18h; sáb e dom 7h–14h (o horário de **abertura** no fim de semana foi suposto como 7h).
- Cidades: Taboão da Serra, Osasco, Santo Amaro, Embu das Artes, Itapevi, Cotia e toda a Grande São Paulo.
- Pagamento: crédito, débito, Pix e dinheiro.
- Endereço (Perfil no Google): R. Senegal, 29a – Parque Monte Alegre, Taboão da Serra/SP, 06756-420. Está no rodapé e nos dados estruturados; o cliente ainda vai decidir se fica visível.
- Perfil no Google: https://share.google/CQ8j87iS3gHWhDKkn (nota 5,0, 56 avaliações em set/2026).
- WhatsApp: (11) 97575-1247. Instagram: @gsvitaliza. Formulário: Formspree `mdalegbn`.

## Já recebido do cliente

- Foto do Cal em alta resolução (sem fundo).
- Fotos reais de antes/depois: sofá retrátil, colchão, tapete, poltrona e banco automotivo.

## Pendências (aguardando o cliente)

1. História do Cal para a seção Sobre (há um `TODO` em `About.astro`).
2. Tempo médio de secagem (`TODO` em `site.ts`, nas perguntas frequentes).
3. Confirmar a lista de serviços e se há extras (impermeabilização, cortinas, cabeceiras, empresas).
4. Diferenciais concretos (garantia, produtos, cursos) e outras perguntas frequentes.
5. Link "Pedir avaliações" do painel do Perfil da Empresa (`site.google.reviewUrl`; hoje aponta para o perfil).
6. Decidir se o endereço fica visível no rodapé.
7. Atualizar o horário no Perfil do Google para ficar igual ao do site.
8. Temas para o blog.
9. Credenciais da API de avaliações (ver abaixo).

## API de avaliações do Google

- **Gratuita**, mas exige aprovação: perfil verificado há mais de 60 dias e formulário "Business Profile API access request" com o número do projeto no Google Cloud.
- Passo a passo combinado: o Cal adiciona o Kauan como Gerente do perfil → projeto no Google Cloud → pedido de acesso → ativar *Google My Business API* (v4, reviews), *My Business Account Management API* e *My Business Business Information API* → OAuth (tela de consentimento Externo, **publicada "Em produção"**, senão o refresh token expira em 7 dias) → refresh token via OAuth Playground com o escopo `https://www.googleapis.com/auth/business.manage` → descobrir o ID da conta e o ID do local.
- Secrets no GitHub: `GBP_CLIENT_ID`, `GBP_CLIENT_SECRET`, `GBP_REFRESH_TOKEN`, `GBP_ACCOUNT_ID`, `GBP_LOCATION_ID`. Sem eles, o script não faz nada (sai com código 0).
- O script ignora avaliações sem texto (só estrelas).

## Para publicar (somente quando o usuário pedir)

1. No GitHub: **Settings → Pages → Build and deployment → Source = GitHub Actions**.
2. Mesclar `redesign` na `main` (via PR). O workflow publica em 1 a 2 minutos.
3. O DNS **não muda**: o domínio já aponta para o GitHub Pages deste repositório e o `CNAME` está em `public/`.

## Git

- Commits terminam com `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
- Só fazer commit ou push quando o usuário pedir.
