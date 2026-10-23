// Pares de antes/depois da seção "Resultados".
// Coloque as fotos em src/assets/resultados/ e informe os nomes dos arquivos.
// - before/after: duas fotos separadas (de preferência do mesmo ângulo)
// - stacked: uma única foto com o antes em cima e o depois embaixo
// Os cards são verticais (3:4); fotos em pé ficam melhores. Sem foto, o site mostra um espaço reservado no lugar.

export type BeforeAfterItem = {
  title: string;
  description: string;
  before?: string;
  after?: string;
  stacked?: string;
};

export const beforeAfter: BeforeAfterItem[] = [
  {
    title: 'Sofá retrátil',
    description: 'Manchas, encardido dos assentos e odores removidos.',
    before: 'sofa-antes.jpeg',
    after: 'sofa-depois.jpeg',
  },
  {
    title: 'Colchão',
    description: 'Manchas de suor e ácaros removidos com extração.',
    before: 'colchao-antes.jpeg',
    after: 'colchao-depois.jpeg',
  },
  {
    title: 'Tapete de sala',
    description: 'Cores recuperadas e fibras limpas, sem trocar o tapete.',
    before: 'tapete-antes.jpg',
    after: 'tapete-depois.jpg',
  },
  {
    title: 'Poltrona',
    description: 'Tecido estampado de volta à cor original.',
    before: 'cadeira-antes.jpeg',
    after: 'cadeira-depois.jpeg',
  },
  {
    title: 'Banco automotivo',
    description: 'Interior do carro limpo, sem sair da garagem.',
    before: 'bancocarro-antes.jpeg',
    after: 'bancocarro-depois.jpeg',
  },
];
