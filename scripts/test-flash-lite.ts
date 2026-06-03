import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
async function main() {
  const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    headers: { "Accept-Encoding": "identity" },
  });
  // Try gemini-2.0-flash-lite: smallest quota usage
  try {
    const { text } = await generateText({
      model: google("gemini-2.0-flash-lite"),
      prompt: "Say: OK",
    });
    console.log("gemini-2.0-flash-lite OK:", text);
  } catch (e: any) {
    console.log("gemini-2.0-flash-lite FAIL:", e.message?.slice(0, 100));
  }

  // Try gemini-2.5-flash-lite
  try {
    const { text } = await generateText({
      model: google("gemini-2.5-flash-lite"),
      prompt: "Say: OK",
    });
    console.log("gemini-2.5-flash-lite OK:", text);
  } catch (e: any) {
    console.log("gemini-2.5-flash-lite FAIL:", e.message?.slice(0, 100));
  }
}
main().catch(console.error);
