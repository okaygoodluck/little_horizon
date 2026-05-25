export const mockJournalEntries = [
  {
    id: 'j1',
    type: 'sleep', // 'sleep' | 'memory'
    date: '2026-05-24',
    time: '20:30',
    title: 'Dormiu bem',
    notes: 'Acordou apenas uma vez durante a madrugada. A rotina do banho morno ajudou muito.',
    durationHours: 6,
  },
  {
    id: 'j2',
    type: 'memory',
    date: '2026-05-22',
    time: '14:15',
    title: 'Primeiro Sorriso',
    notes: 'Sorriu enquanto brincávamos no Tummy Time! Foi lindo.',
    photoUrl: null, // MVP: sem anexo de fotos real
  },
  {
    id: 'j3',
    type: 'sleep',
    date: '2026-05-21',
    time: '15:00',
    title: 'Soneca da Tarde',
    notes: 'Dormiu por 2 horas, janela de sono foi respeitada certinho.',
    durationHours: 2,
  },
  {
    id: 'j4',
    type: 'memory',
    date: '2026-05-15',
    time: '09:00',
    title: 'Levantou a cabeça',
    notes: 'Conseguiu erguer e sustentar a cabeça por vários segundos.',
    photoUrl: null,
  }
];
