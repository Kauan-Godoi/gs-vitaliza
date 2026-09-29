// Pares de antes/depois da seção "Resultados".
// Coloque as fotos em src/assets/resultados/ e informe os nomes dos arquivos.
// - before/after: duas fotos separadas (de preferência do mesmo ângulo)
// - stacked: uma única foto com o antes em cima e o depois embaixo
// Sem foto, o site mostra um espaço reservado no lugar.

export type BeforeAfterItem = {
  title: string;
  description: string;
  before?: string;
  after?: string;
  stacked?: string;
};

export const beforeAfter: BeforeAfterItem[] = [
  {
    title: 'Tapete de sala',
    description: 'Cores recuperadas e fibras limpas, sem trocar o tapete.',
    stacked: 'tapete.jpg',
  },
  {
    title: 'Sofá',
    description: 'Remoção de manchas, encardido dos braços e odores.',
  },
  {
    title: 'Colchão',
    description: 'Manchas de suor e ácaros removidos com extração.',
  },
  {
    title: 'Banco automotivo',
    description: 'Interior do carro limpo, sem sair da garagem.',
  },
];
