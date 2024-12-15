import { generateGemini } from "./GeminiService";
import { CharaPrompt } from "./prompts/CharaPrompt";

export type BymePersonality = {
  personality: "cute" | "cool" | "poor" | "philosophy";
}

type BymeRequest = {
  personality: BymePersonality;
  power: number;
}

export const generateBymeComment = (input: BymeRequest): Promise<string> => {
  const requestJson = JSON.stringify(input);

  return generateGemini(CharaPrompt + requestJson)
  .then(response => {
    const comment = JSON.parse(response).comment;
    return (comment as string);
  })
  .catch(error => {
    console.error(error);
    return "今はお話できないみたい......";
  });
}