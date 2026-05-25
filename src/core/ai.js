import { GoogleGenerativeAI } from '@google/generative-ai';

// Usamos uma variável de ambiente no Expo
// Para testar, você precisará de um arquivo .env na raiz do projeto com EXPO_PUBLIC_GEMINI_API_KEY=sua_chave
const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY || 'dummy_key';

const genAI = new GoogleGenerativeAI(apiKey);

const systemInstruction = `
Você é o Little Horizon Copilot, uma IA pediátrica assistente voltada para pais e mães de bebês e crianças até 10 anos.
Seu tom deve ser extremamente acolhedor, calmo e sem terrorismo parental.
Traduza informações complexas de saúde infantil e neurodesenvolvimento para uma linguagem simples e prática.
Sempre lembre os pais que você é um assistente virtual e que casos críticos (febre alta persistente, dificuldades respiratórias, alergias severas) exigem procurar um médico imediatamente.
`;

export const getCopilotChat = () => {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction,
  });

  // Retorna uma nova sessão de chat
  return model.startChat({
    history: [],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 500,
    },
  });
};
