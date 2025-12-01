import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API_KEY is not defined in process.env");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const solveWithAI = async (expression: string, context?: string): Promise<string> => {
  const ai = getClient();
  if (!ai) return "Error: Configura tu API KEY.";

  try {
    // We use gemini-3-pro-preview for better reasoning on math
    const modelId = "gemini-3-pro-preview";

    const prompt = `
      You are an expert mathematics tutor integrated into a Casio FX-991CW calculator.
      
      User Input: "${expression}"
      Context/History: "${context || 'None'}"

      Task:
      1. If the input is a math expression, solve it step-by-step.
      2. If it is a concept question, explain it briefly.
      3. Format the output clearly with Markdown.
      4. Be concise but helpful. Use the styling of a "Math Output" display.

      If the input is just a number or simple calculation, confirm the result and show the steps briefly.
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        // Thinking budget helps with complex math logic
        thinkingConfig: { thinkingBudget: 1024 }, 
        maxOutputTokens: 2048,
      }
    });

    return response.text || "No response from AI.";

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Connection Error. Please try again.";
  }
};