# GS Vitaliza — Higienização de Estofados

Site oficial da **GS Vitaliza Estofados** (Taboão da Serra/SP): [gsvitaliza.com.br](https://gsvitaliza.com.br/)

Feito com [Astro](https://astro.build): site estático, rápido, com imagens otimizadas automaticamente (WebP responsivo), blog em Markdown e SEO local (dados estruturados de negócio local, FAQ e artigos).

## Rodando localmente

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # gera o site em dist/
npm run preview  # serve o dist/ localmente
```

## Onde editar o conteúdo

| O quê | Arquivo |
| --- | --- |
| Telefone, WhatsApp, Instagram, horário, nota do Google | `src/data/site.ts` |
| Serviços, "Por que escolher", passos, perguntas frequentes | `src/data/site.ts` |
| Fotos da galeria de resultados | `src/assets/portfolio/` + lista em `src/components/sections/Results.astro` |
| Foto da seção "Sobre" | salvar como `src/assets/brand/sobre.jpg` |
| Avaliações do Google | `src/data/reviews.json` (automático, ver abaixo) |
| Artigos do blog | `src/content/blog/*.md` |

### Novo artigo no blog

Crie um arquivo `.md` em `src/content/blog/`. O nome do arquivo vira a URL (`/blog/nome-do-arquivo/`).

```md
---
title: 'Título do artigo'
description: 'Resumo de 1–2 frases (aparece no Google e nos cards).'
date: 2026-10-15
cover: '../../assets/portfolio/01.jpg'
coverAlt: 'Descrição da imagem de capa'
draft: false   # true = só aparece no npm run dev
---

Texto do artigo em Markdown...
```

## Avaliações do Google

O carrossel lê `src/data/reviews.json`. O script `scripts/fetch-reviews.mjs` preenche esse arquivo com **todas** as avaliações via API do Perfil da Empresa no Google. O workflow roda o script a cada deploy e uma vez por dia.

Para ativar, cadastre estes secrets no repositório (Settings → Secrets and variables → Actions):

- `GBP_CLIENT_ID`, `GBP_CLIENT_SECRET`, `GBP_REFRESH_TOKEN` — OAuth da conta Google proprietária do perfil
- `GBP_ACCOUNT_ID`, `GBP_LOCATION_ID` — IDs da conta e do local no Perfil da Empresa

Sem os secrets o script é ignorado e o site mostra um botão para as avaliações no Google.

## Deploy

GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`) a cada push na `main`.
Em **Settings → Pages → Build and deployment → Source**, selecione **GitHub Actions**.
O domínio personalizado fica em `public/CNAME`.

---

Desenvolvido por **Kauan Godoi Soares**.
