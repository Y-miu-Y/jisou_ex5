import { GoogleGenerativeAI } from "@google/generative-ai"

const GeminiAPI = () => {
  return new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY!)
    .getGenerativeModel({model: 'gemini-pro'});
}

export const generateGemini = async (prompt: string): Promise<string> => {
  console.debug(prompt);
  const result = await GeminiAPI().generateContent(prompt);
  const text = await result.response.text();
  return text;
}