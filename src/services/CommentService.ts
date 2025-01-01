import { generateGemini } from "./GeminiService";
import { CharaPrompt } from "./prompts/CharaPrompt";

type BymeRequest = {
  personality: string;
  power: number;
}

export const generateBymeComment = (input: BymeRequest): Promise<string> => {
  const requestJson = JSON.stringify(input);

  return generateGemini(CharaPrompt + requestJson)
  .then(response => {
    const comment = response;
    return (comment as string);
  })
  .catch(error => {
    console.error(error);
    return "今はお話できないみたい......";
  });
}