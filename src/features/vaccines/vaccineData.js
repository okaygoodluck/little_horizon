// Mock database para o catálogo de vacinas

export const VACCINE_CATALOG = [
  {
    id: 'v1',
    name: 'BCG',
    ageInMonths: 0,
    description: 'Protege contra formas graves de tuberculose.',
    susInfo: 'Disponível no SUS (dose única).',
    privateInfo: 'Mesma vacina do SUS.',
    recommendation: 'SUS', // Qual vale mais a pena
    why: 'A vacina do SUS é exatamente a mesma da rede particular. Não há vantagem em pagar.',
  },
  {
    id: 'v2',
    name: 'Hepatite B',
    ageInMonths: 0,
    description: 'Previne a hepatite B.',
    susInfo: 'Disponível no SUS.',
    privateInfo: 'Mesma vacina do SUS.',
    recommendation: 'SUS',
    why: 'Idêntica na rede pública e privada.',
  },
  {
    id: 'v3',
    name: 'Hexavalente',
    ageInMonths: 2,
    description: 'Protege contra Difteria, Tétano, Coqueluche, Meningite B, Pólio e Hepatite B.',
    susInfo: 'No SUS é dada separadamente (Pentavalente + Pólio), gerando mais de uma picada e com célula inteira da coqueluche (pode dar mais febre).',
    privateInfo: 'Versão acelular (menos reações adversas) e todas em uma única picada.',
    recommendation: 'Particular',
    why: 'Vale o investimento se possível: menos dor (uma picada só) e chance drasticamente menor de febre alta.',
  },
  {
    id: 'v4',
    name: 'Rotavírus',
    ageInMonths: 2,
    description: 'Previne diarreia grave causada por rotavírus.',
    susInfo: 'Monovalente (protege contra 1 tipo) em 2 doses.',
    privateInfo: 'Pentavalente (protege contra 5 tipos) em 3 doses.',
    recommendation: 'Particular',
    why: 'A versão particular oferece uma cobertura muito mais ampla, garantindo mais proteção.',
  }
];

// Estado mockado localmente para o MVP
export const mockChildVaccines = [
  { vaccineId: 'v1', status: 'aplicada', date: '2026-05-10' },
  { vaccineId: 'v2', status: 'aplicada', date: '2026-05-10' },
  { vaccineId: 'v3', status: 'pendente' },
  { vaccineId: 'v4', status: 'pendente' },
];
