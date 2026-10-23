// Busca TODAS as avaliações do Perfil da Empresa no Google e grava em src/data/reviews.json.
//
// Requer (variáveis de ambiente / GitHub Secrets):
//   GBP_CLIENT_ID, GBP_CLIENT_SECRET, GBP_REFRESH_TOKEN  -> OAuth da conta proprietária do perfil
//   GBP_ACCOUNT_ID, GBP_LOCATION_ID                      -> IDs numéricos da conta e do local
//
// Sem essas variáveis o script não faz nada e o site usa o reviews.json atual.
import { writeFile } from 'node:fs/promises';

const OUTPUT = new URL('../src/data/reviews.json', import.meta.url);
const STARS = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 };

const { GBP_CLIENT_ID, GBP_CLIENT_SECRET, GBP_REFRESH_TOKEN, GBP_ACCOUNT_ID, GBP_LOCATION_ID } = process.env;

if (!GBP_CLIENT_ID || !GBP_CLIENT_SECRET || !GBP_REFRESH_TOKEN || !GBP_ACCOUNT_ID || !GBP_LOCATION_ID) {
  console.log('fetch-reviews: credenciais ausentes, mantendo src/data/reviews.json atual.');
  process.exit(0);
}

async function getAccessToken() {
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: GBP_CLIENT_ID,
      client_secret: GBP_CLIENT_SECRET,
      refresh_token: GBP_REFRESH_TOKEN,
      grant_type: 'refresh_token',
    }),
  });
  if (!res.ok) throw new Error(`OAuth falhou: ${res.status} ${await res.text()}`);
  return (await res.json()).access_token;
}

async function fetchAllReviews(token) {
  const base = `https://mybusiness.googleapis.com/v4/accounts/${GBP_ACCOUNT_ID}/locations/${GBP_LOCATION_ID}/reviews`;
  const all = [];
  let pageToken = '';
  do {
    const url = `${base}?pageSize=50&orderBy=updateTime%20desc${pageToken ? `&pageToken=${pageToken}` : ''}`;
    const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) throw new Error(`API de avaliações falhou: ${res.status} ${await res.text()}`);
    const data = await res.json();
    all.push(...(data.reviews ?? []));
    pageToken = data.nextPageToken ?? '';
  } while (pageToken);
  return all;
}

const token = await getAccessToken();
const raw = await fetchAllReviews(token);

const reviews = raw
  // Avaliações só com estrelas (sem texto) não rendem um card legível.
  .filter((r) => r.comment)
  .map((r) => ({
    author: r.reviewer?.displayName ?? 'Cliente Google',
    photo: r.reviewer?.profilePhotoUrl ?? null,
    rating: STARS[r.starRating] ?? 5,
    // O Google anexa a tradução automática ao comentário; mantemos só o original.
    text: r.comment.split('(Translated by Google)')[0].replace('(Original)', '').trim(),
    date: r.createTime,
  }));

await writeFile(OUTPUT, JSON.stringify({ updatedAt: new Date().toISOString(), reviews }, null, 2) + '\n');
console.log(`fetch-reviews: ${reviews.length} avaliações com texto salvas (${raw.length} no total).`);
