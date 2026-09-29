import { getCollection } from 'astro:content';

// Posts publicados (rascunhos aparecem só no `npm run dev`), do mais novo ao mais antigo.
export async function getPosts() {
  const posts = await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}
