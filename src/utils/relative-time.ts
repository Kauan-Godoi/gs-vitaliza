// "4 meses atrás", "1 semana atrás"... no estilo das avaliações do Google.
const UNITS: [limit: number, seconds: number, singular: string, plural: string][] = [
  [60 * 60 * 24 * 7, 60 * 60 * 24, 'dia', 'dias'],
  [60 * 60 * 24 * 30, 60 * 60 * 24 * 7, 'semana', 'semanas'],
  [60 * 60 * 24 * 365, 60 * 60 * 24 * 30, 'mês', 'meses'],
  [Infinity, 60 * 60 * 24 * 365, 'ano', 'anos'],
];

export function timeAgo(date: Date | string, now = new Date()) {
  const diff = Math.max(0, (now.getTime() - new Date(date).getTime()) / 1000);
  if (diff < 60 * 60 * 24) return 'hoje';
  for (const [limit, seconds, singular, plural] of UNITS) {
    if (diff < limit) {
      const n = Math.max(1, Math.floor(diff / seconds));
      return `${n === 1 ? 'um' : n} ${n === 1 ? singular : plural} atrás`;
    }
  }
  return '';
}
