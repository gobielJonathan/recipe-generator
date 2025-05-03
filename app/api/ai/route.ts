import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function GET(req: Request) {
  const start = performance.now();
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: "Explain how AI works in a few words",
  });

  console.log(response.text);

  return new Response(
    JSON.stringify({
      body: {
        message: response.text,
        time: performance.now() - start,
      },
    })
  );
}
