import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
async function main() {
  const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
  });
  const response = await ai.models.list();
  for await (const model of response) {
    if (
      !model.name.includes("embed") &&
      model.supportedActions?.includes("generateContent")
    ) {
      console.log(model.name);
    }
  }
}
main().catch(console.error);
