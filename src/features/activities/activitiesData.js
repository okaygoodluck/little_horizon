export const ACTIVITIES_CATALOG = [
  {
    id: 'a1',
    title: 'Contato Visual e Voz Calma',
    minAgeMonths: 0,
    maxAgeMonths: 3,
    category: 'Sócio-Emocional',
    duration: '5 a 10 min',
    icon: '👀',
    instructions: 'Posicione o bebê a cerca de 20-30 cm do seu rosto. Fale suavemente, cante ou faça expressões faciais exageradas. Espere ele focar em você.',
    benefits: 'O recém-nascido só enxerga de perto. Isso ajuda a criar vínculo seguro e a desenvolver o foco visual inicial.',
  },
  {
    id: 'a2',
    title: 'Tummy Time (Bruços)',
    minAgeMonths: 1,
    maxAgeMonths: 6,
    category: 'Motor',
    duration: '3 a 5 min',
    icon: '👶',
    instructions: 'Coloque o bebê de bruços sobre o seu peito ou em um tapete firme enquanto ele estiver acordado e supervisionado. Chame a atenção dele com um brinquedo.',
    benefits: 'Fortalece o pescoço, ombros e braços, preparando o bebê para rolar e engatinhar. Previne cabeça chata (plagiocefalia).',
  },
  {
    id: 'a3',
    title: 'Seguindo o Objeto',
    minAgeMonths: 2,
    maxAgeMonths: 4,
    category: 'Cognitivo',
    duration: '5 min',
    icon: '🧸',
    instructions: 'Pegue um brinquedo de alto contraste (preto, branco, vermelho). Movimente lentamente da esquerda para a direita, incentivando o bebê a seguir com os olhos.',
    benefits: 'Treina o rastreamento visual e a coordenação olho-cabeça.',
  },
  {
    id: 'a4',
    title: 'Conversa de Balbucio',
    minAgeMonths: 3,
    maxAgeMonths: 6,
    category: 'Linguagem',
    duration: 'Vários momentos',
    icon: '🗣️',
    instructions: 'Quando o bebê fizer sons (ahh, ooh), responda copiando o som dele e fazendo uma pausa, como num diálogo real.',
    benefits: 'Ensina que a comunicação é uma troca (turn-taking) e encoraja a fala.',
  }
];

// Simulador de progresso diário
export const mockDailyProgress = {
  date: new Date().toISOString().split('T')[0],
  completedIds: ['a1']
};
