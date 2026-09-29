// Dados centrais do negócio. Mantenha iguais ao Perfil da Empresa no Google
// (nome, telefone, área e horário) — o Google cruza essas informações.

export const site = {
  name: 'GS Vitaliza Estofados',
  shortName: 'GS Vitaliza',
  url: 'https://gsvitaliza.com.br',
  description:
    'Higienização de sofás, colchões, poltronas, tapetes e bancos automotivos a domicílio em Taboão da Serra e região. Elimina ácaros, manchas e odores.',
  phoneDisplay: '(11) 97575-1247',
  phoneE164: '+5511975751247',
  whatsappNumber: '5511975751247',
  instagram: 'https://www.instagram.com/gsvitaliza',
  instagramHandle: '@gsvitaliza',
  owner: { name: 'Cal', fullName: 'Carlos Eduardo Godoi Soares', experience: '1 ano e meio' },
  address: {
    street: 'R. Senegal, 29a',
    district: 'Parque Monte Alegre',
    postalCode: '06756-420',
  },
  city: 'Taboão da Serra',
  region: 'SP',
  areaServed: ['Taboão da Serra', 'Osasco', 'Santo Amaro', 'Embu das Artes', 'Itapevi', 'Cotia'],
  areaServedSummary: 'Taboão da Serra, Osasco, Santo Amaro, Embu das Artes, Itapevi, Cotia e toda a Grande São Paulo',
  openingHours: [
    { label: 'Segunda a sexta', short: 'Seg a sex', days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '07:00', closes: '18:00' },
    { label: 'Sábado e domingo', short: 'Sáb e dom', days: ['Saturday', 'Sunday'], opens: '07:00', closes: '14:00' },
  ],
  paymentMethods: ['Crédito', 'Débito', 'Pix', 'Dinheiro'],
  google: {
    rating: 5.0,
    reviewCount: 56,
    profileUrl: 'https://share.google/CQ8j87iS3gHWhDKkn',
    // TODO: link "Pedir avaliações" do painel business.google.com (g.page/r/.../review).
    reviewUrl: 'https://share.google/CQ8j87iS3gHWhDKkn',
  },
  formspree: 'https://formspree.io/f/mdalegbn',
};

export function whatsappLink(message = 'Olá! Vim pelo site e gostaria de um orçamento de higienização.') {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const services = [
  {
    id: 'sofas',
    title: 'Sofás',
    icon: 'sofa',
    text: 'Sofás retráteis, de canto, chaise e sofá-cama. Limpeza profunda por extração que remove sujeira acumulada, manchas do dia a dia e odores.',
  },
  {
    id: 'colchoes',
    title: 'Colchões',
    icon: 'bed',
    text: 'Solteiro, casal, queen e king. Eliminação de ácaros, fungos e resíduos de suor — ideal para quem tem rinite, alergias ou crianças em casa.',
  },
  {
    id: 'automotivos',
    title: 'Bancos automotivos',
    icon: 'car',
    text: 'Bancos de tecido e couro, carpetes e teto do carro. Higienização completa do interior sem precisar levar o carro a lugar nenhum.',
  },
  {
    id: 'poltronas-cadeiras',
    title: 'Poltronas e cadeiras',
    icon: 'chair',
    text: 'Poltronas, cadeiras de jantar estofadas e cadeiras de escritório. Atendemos residências e também comércios, salões e escritórios.',
  },
  {
    id: 'tapetes',
    title: 'Tapetes',
    icon: 'rug',
    text: 'Tapetes de sala e quarto. Recuperamos cores e textura, removendo pó, pelos de pets e sujeira impregnada nas fibras.',
  },
  {
    id: 'infantil',
    title: 'Itens infantis',
    icon: 'baby',
    text: 'Cadeirinhas de carro, bebê-conforto e pelúcias. Higienização cuidadosa, com produtos seguros para os pequenos.',
  },
] as const;

export const reasons = [
  { title: 'Vamos até você', text: 'Atendimento a domicílio com todo o equipamento. Você não precisa transportar nada.' },
  { title: 'Nota 5,0 no Google', text: 'Média 5,0 em mais de 50 avaliações de clientes reais no Google.' },
  { title: 'Produtos profissionais', text: 'Produtos de alta performance que limpam a fundo e preservam as fibras do tecido.' },
  { title: 'Saúde em primeiro lugar', text: 'Remoção de ácaros, fungos e bactérias — um ambiente mais saudável para sua família e pets.' },
  { title: 'Orçamento rápido', text: 'Mande uma foto pelo WhatsApp e receba seu orçamento sem compromisso.' },
  { title: 'Atendimento próximo', text: 'Contato direto, pontualidade e atenção a cada detalhe do serviço.' },
];

export const steps = [
  { title: 'Solicitação pelo WhatsApp', text: 'Envie fotos do estofado e conte o que precisa. Respondemos rápido com o orçamento.' },
  { title: 'Agendamento', text: 'Escolha o melhor dia e horário. Confirmamos tudo por mensagem.' },
  { title: 'Atendimento a domicílio', text: 'Chegamos com equipamento profissional e fazemos a higienização no seu espaço.' },
  { title: 'Resultado', text: 'Estofado limpo, cheiroso e livre de ácaros. É só aguardar a secagem e aproveitar.' },
];

// TODO: confirmar com o cliente o tempo médio de secagem.
export const faq = [
  {
    q: 'Quanto tempo leva para secar?',
    a: 'Depende do tecido, da ventilação e do clima. Em geral o estofado fica pronto para uso em algumas horas; deixar o ambiente arejado e com ventilador ligado acelera a secagem.',
  },
  {
    q: 'Preciso estar em casa durante o serviço?',
    a: 'Sim, pedimos que alguém maior de idade receba a equipe e acompanhe o início do atendimento.',
  },
  {
    q: 'O serviço remove todas as manchas?',
    a: 'A grande maioria das manchas sai com a higienização. Algumas, como tinta, caneta ou manchas muito antigas, podem ficar atenuadas. Avaliamos pela foto e falamos com transparência antes de fechar.',
  },
  {
    q: 'Os produtos são seguros para crianças e pets?',
    a: 'Sim. Usamos produtos profissionais próprios para estofados, seguros para uso em casa depois da secagem.',
  },
  {
    q: 'Quais regiões vocês atendem?',
    a: 'Atendemos Taboão da Serra, Osasco, Santo Amaro, Embu das Artes, Itapevi, Cotia e toda a Grande São Paulo. Consulte seu bairro pelo WhatsApp.',
  },
  {
    q: 'Como é feito o orçamento?',
    a: 'Pelo WhatsApp: envie uma foto do item e informe o tamanho (ex.: sofá 3 lugares, colchão queen). O orçamento é gratuito e sem compromisso.',
  },
  {
    q: 'Quais as formas de pagamento?',
    a: 'Aceitamos cartão de crédito, débito, Pix e dinheiro.',
  },
  {
    q: 'Qual o horário de atendimento?',
    a: 'De segunda a sexta, das 7h às 18h. Aos sábados e domingos, das 7h às 14h.',
  },
  {
    q: 'De quanto em quanto tempo devo higienizar?',
    a: 'O recomendado é a cada 6 meses a 1 ano. Em casas com pets, crianças pequenas ou pessoas alérgicas, o ideal é a cada 6 meses.',
  },
];
