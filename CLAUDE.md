# GS Vitaliza — contexto do projeto

Site da **GS Vitaliza Estofados**, higienização de estofados a domicílio em Taboão da Serra/SP. Domínio: `gsvitaliza.com.br`.
Desenvolvedor: Kauan Godoi Soares. Dono da empresa: **Cal** (Carlos Eduardo Godoi Soares), com cerca de 1 ano e meio de experiência em set/2026. Sempre tratar como "Cal" no site.
Todo o conteúdo do site e a comunicação com o usuário são em **português do Brasil**.

## Estado atual (out/2026)

- **O site novo (Astro) está publicado** em https://gsvitaliza.com.br desde 23/10/2026 (merge do PR #1, `redesign` → `main`), antes da API de avaliações.
- O GitHub Pages publica pelo workflow `.github/workflows/deploy.yml` (Source = GitHub Actions). **Todo push na `main` vai direto para o ar.** Trabalhe sempre em uma branch (`redesign` ou outra) e só mescle na `main` quando o usuário aprovar.
- O repositório é clonado do GitHub numa pasta fora do OneDrive (a cópia antiga no OneDrive foi abandonada). Depois de clonar: `npm install`.
- O site antigo (template Bootstrap) está guardado na tag **`site-antigo`**. Para voltar atrás em emergência: reverter o merge na `main` (`git revert -m 1 <merge>`) ou publicar a partir da tag.
- O site antigo só tinha `/index.html`, que continua existindo no site novo; não foi preciso criar redirecionamentos.

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
| `src/data/site.ts` | **Fonte única dos dados do negócio**: telefone/WhatsApp, e-mail, Instagram, dono, razão social/CNPJ, endereço (**não exibir**), cidades atendidas, horários, formas de pagamento, nota e links do Google, Formspree, serviços, "por que escolher", passos do processo e perguntas frequentes. Também `tracking` (IDs do GA4/Google Ads) e `trackingIds` |
| `src/data/results.ts` | Pares de antes/depois (fotos em `src/assets/resultados/`, nomes `<item>-antes` / `<item>-depois`). Cards verticais 3:4, 3 por linha (flex, última linha centralizada). Sem foto, o site mostra um espaço reservado listrado |
| `src/data/reviews.json` | Avaliações do carrossel. **Vazio de propósito**: nunca inserir avaliações inventadas. Com o arquivo vazio, a seção mostra só o selo e um botão para o perfil no Google |
| `src/components/sections/*.astro` | Seções da home, nesta ordem: Hero, Services, WhyUs, Process, Results, Reviews, About, Faq, BlogTeaser, Contact |
| `src/components/` | Header (pílula flutuante; prop `overlay` só na home), Footer, Icon (SVGs inline), BeforeAfter (comparador), PostCard, FloatButtons (Instagram + WhatsApp flutuantes), Analytics (tag do Google, Consent Mode v2 e conversões), CookieConsent (aviso de cookies) |
| `src/layouts/BaseLayout.astro` | `<head>`, fontes, SEO/OG e dados estruturados `HomeAndConstructionBusiness` (sem rua/CEP: empresa de área de serviço). Props `overlayHeader` (hero escuro) e `noindex` |
| `src/env.d.ts` | Tipos de `window.gsConsent` / `window.gsTrack` |
| `src/content/blog/*.md` | Artigos do blog (schema em `src/content.config.ts`: title, description, date, cover, coverAlt, draft) |
| `src/pages/` | `index.astro` (com dados estruturados de FAQ), `blog/index.astro`, `blog/[id].astro`, `404.astro`, `obrigado.astro` (destino do formulário, `noindex`, fora do sitemap), `privacidade.astro` (política LGPD) |
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
- Fonte Plus Jakarta Sans hospedada no próprio site via `@fontsource/plus-jakarta-sans` (só o subconjunto `latin-*`, pesos 400–800, importados no `BaseLayout`). **Não usar Google Fonts.**
- **Nunca exibir o endereço da R. Senegal** (é a casa do dono) em página, rodapé ou dados estruturados. Mostrar só "Taboão da Serra/SP" e a área atendida.
- Animação `.reveal` só aparece com JS. Respeite `prefers-reduced-motion`.
- Screenshots com Chrome headless: a janela tem largura mínima de ~500px. Para testar mobile (390px), renderize dentro de um `<iframe>` de 390px.

## Dados confirmados pelo cliente

- Horário: seg–sex 7h–18h; sáb e dom 7h–14h (o horário de **abertura** no fim de semana foi suposto como 7h).
- Cidades: Taboão da Serra, Osasco, Santo Amaro, Embu das Artes, Itapevi, Cotia e toda a Grande São Paulo.
- Pagamento: crédito, débito, Pix e dinheiro.
- Endereço (Perfil no Google): R. Senegal, 29a – Parque Monte Alegre, Taboão da Serra/SP, 06756-420. É a casa do dono: **não aparece no site** (decisão de out/2026). Fica só em `site.address`, sem uso em páginas. A empresa é tratada como área de serviço (atende a domicílio).
- Perfil no Google: https://share.google/CQ8j87iS3gHWhDKkn (nota 5,0, 62 avaliações em 23/10/2026; atualizar `site.google.reviewCount` à mão até a API estar ativa).
- WhatsApp: (11) 97575-1247. Instagram: @gsvitaliza. Formulário: Formspree `mdalegbn`.
- Empresa: MEI. Razão social 62.892.001 Carlos Eduardo Godoi Soares, CNPJ 62.892.001/0001-45 (`site.legalName` / `site.cnpj`). Aparecem só na política de privacidade, no rodapé e nos dados estruturados; no resto do site o dono é sempre "Cal".

## Já recebido do cliente

- Foto do Cal em alta resolução (sem fundo).
- Fotos reais de antes/depois: sofá retrátil, colchão, tapete, poltrona e banco automotivo.

## Pendências (aguardando o cliente)

1. História do Cal para a seção Sobre. Hoje há um texto genérico provisório (sem anos de experiência, cursos ou números) e um `TODO` em `About.astro`.
2. Tempo médio de secagem. A pergunta foi **removida** do FAQ (site e dados estruturados) até haver resposta confirmada; `TODO` em `site.ts`.
3. Confirmar a lista de serviços e se há extras (impermeabilização, cortinas, cabeceiras, empresas).
4. Diferenciais concretos (garantia, produtos, cursos) e outras perguntas frequentes.
5. Link "Pedir avaliações" do painel do Perfil da Empresa (`site.google.reviewUrl`; hoje aponta para o perfil).
6. ✅ Resolvido (23/10/2026): o endereço fica oculto no site.
7. Atualizar o horário no Perfil do Google para ficar igual ao do site.
8. Temas para o blog.
9. Aprovação da API de avaliações pelo Google (ver abaixo).
10. Depois da aprovação da API do Google, configurar o Perfil da Empresa como área de serviço e ocultar o endereço.

## Próximos passos (do lado do Kauan)

**Prioridade agora:**
1. **Google Ads:** criar as ações de conversão e preencher `tracking` em `src/data/site.ts` (ver "Google Ads" abaixo).
2. **Google Search Console:** verificar o domínio. Se for pela tag HTML, adicionar a `<meta name="google-site-verification">` no `BaseLayout.astro` (o código vem do Search Console); depois enviar `https://gsvitaliza.com.br/sitemap-index.xml`.

**Pendências técnicas:**
- Marcar **Enforce HTTPS** em Settings → Pages (estava desligado em 23/10/2026).
- Testar um envio real do formulário (chegada no e-mail pelo Formspree e redirecionamento para `/obrigado/`).
- Após a aprovação da API: ocultar o endereço no Perfil da Empresa no Google (área de serviço).

## API de avaliações do Google

- **Gratuita**, mas exige aprovação: perfil verificado há mais de 60 dias e formulário "Business Profile API access request" com o número do projeto no Google Cloud.
- Passo a passo combinado: o Cal adiciona o Kauan como Gerente do perfil → projeto no Google Cloud → pedido de acesso → ativar *Google My Business API* (v4, reviews), *My Business Account Management API* e *My Business Business Information API* → OAuth (tela de consentimento Externo, **publicada "Em produção"**, senão o refresh token expira em 7 dias) → refresh token via OAuth Playground com o escopo `https://www.googleapis.com/auth/business.manage` → descobrir o ID da conta e o ID do local.
- **Status (23/10/2026):** pedido de acesso enviado ao Google em 23/10/2026, registro **6-9945000041834**, prazo de 7 a 10 dias úteis. Tela de consentimento OAuth já está **"Em produção"**.
- Secrets no GitHub: `GBP_CLIENT_ID`, `GBP_CLIENT_SECRET` e `GBP_REFRESH_TOKEN` **já cadastrados**. Faltam `GBP_ACCOUNT_ID` e `GBP_LOCATION_ID`, que só dá para descobrir depois da aprovação. Sem os cinco, o script não faz nada (sai com código 0).
- **Nunca pedir nem receber as chaves no chat.** O Kauan cadastra direto nos Secrets; o teste é rodando o workflow (Actions → Deploy → Run workflow).
- Depois de ativa, a API também pode atualizar `site.google.rating` e `reviewCount` (hoje fixos no `site.ts`); o script ainda não faz isso.
- O script ignora avaliações sem texto (só estrelas).

## Google Ads

O site novo existe para receber tráfego de anúncios do Google Ads depois da publicação. Priorize conversão (botões de orçamento visíveis, WhatsApp, velocidade) em toda mudança.

- IDs em `tracking` (`src/data/site.ts`). **Vazios = nenhum script do Google, nenhum aviso de cookies e nenhum link "Preferências de cookies".**
- Consent Mode v2, modo avançado: `ad_storage`, `ad_user_data`, `ad_personalization` e `analytics_storage` começam `denied` antes da tag; `ads_data_redaction` e `url_passthrough` ligados. A escolha fica no `localStorage` (`gs-consent`). O aviso (`CookieConsent.astro`) é um cartão no canto inferior esquerdo no desktop e uma barra no rodapé da tela no celular, com espaço à direita para os botões flutuantes; testado em 390×844 sem cobrir o botão "Solicitar orçamento gratuito" do hero.
- `Analytics.astro` carrega a tag do Google (gtag) e conta como conversão: clique em link `wa.me` (`whatsapp`), `tel:` (`phone`), `mailto:` (`email`) e a visita a `/obrigado` (`form`). Cada um dispara `generate_lead` no GA4 e, se houver rótulo em `tracking.conversions`, a conversão do Ads.
- O formulário envia via `fetch` ao Formspree e redireciona para `/obrigado/`. O campo oculto `origem` leva o `gclid`/UTMs da visita (guardados no `sessionStorage`).
- Para ativar: criar as ações de conversão no Google Ads (tipo "Site", configuração manual com código), copiar o `AW-...` e os rótulos para `tracking`; opcionalmente criar a propriedade GA4 (`G-...`) e vincular ao Ads.
- A política de privacidade (`/privacidade`) lista os dados coletados (campos do formulário, `origem`) e os fornecedores (Formspree, Google Analytics/Ads/Perfil da Empresa, Meta/WhatsApp, CRM, GitHub Pages) e descreve o aviso de cookies. Atualize a política e a data dela se mudar o formulário ou entrar outra ferramenta.

## Publicação

1. **Settings → Pages → Source = GitHub Actions** (já configurado; antes era "Deploy from a branch", que serviria o código-fonte).
2. Mudanças entram no ar ao mesclar na `main` (via PR). O workflow publica em 1 a 2 minutos.
3. **Enforce HTTPS** em Settings → Pages deve ficar marcado (a política de privacidade promete HTTPS).
4. Atualização manual das avaliações: **Actions → Deploy → Run workflow** (o `deploy.yml` tem `workflow_dispatch`); ele também roda todo dia às 09:00 UTC.
5. O DNS **não muda**: o domínio já aponta para o GitHub Pages deste repositório e o `CNAME` está em `public/`.

## Git

- Commits terminam com `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
- Só fazer commit ou push quando o usuário pedir. Push na `main` publica o site.
