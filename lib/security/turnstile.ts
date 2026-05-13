import { env } from "@/lib/env";

interface TurnstileResponse {
  success: boolean;
  "error-codes"?: string[];
  challenge_ts?: string;
  hostname?: string;
}

export async function verifyTurnstileToken(token: string): Promise<boolean> {
  const secretKey = env.TURNSTILE_SECRET_KEY;
  if (!secretKey) {
    if (process.env.NODE_ENV === "development") {
      console.warn("⚠️ Turnstile verification is disabled. TURNSTILE_SECRET_KEY is not set.");
      return true;
    }
    // In production, if we require Turnstile but lack the key, we should fail closed.
    return false;
  }

  try {
    const formData = new URLSearchParams();
    formData.append("secret", secretKey);
    formData.append("response", token);

    const result = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        body: formData,
        method: "POST",
      }
    );

    const outcome = (await result.json()) as TurnstileResponse;
    if (!outcome.success) {
      console.error("Turnstile verification failed:", outcome["error-codes"]);
    }
    return outcome.success;
  } catch (err) {
    console.error("Error verifying Turnstile token:", err);
    return false;
  }
}
