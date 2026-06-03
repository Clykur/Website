const OPEN_MS = 10 * 60 * 1000;

let unavailableUntil = 0;

function isQuotaError(err: unknown): boolean {
  const msg =
    err instanceof Error
      ? err.message
      : typeof err === "string"
        ? err
        : JSON.stringify(err);
  return (
    /429|quota|RESOURCE_EXHAUSTED|rate.?limit|exceeded your current quota/i.test(
      msg,
    ) || (err as { statusCode?: number })?.statusCode === 429
  );
}

export function isGeminiCircuitOpen(): boolean {
  return Date.now() < unavailableUntil;
}

export function markGeminiFailure(err: unknown): void {
  if (!isQuotaError(err)) return;
  unavailableUntil = Date.now() + OPEN_MS;
  console.warn(
    `[Chat API] Gemini circuit open until ${new Date(unavailableUntil).toISOString()}`,
  );
}

export function resetGeminiCircuitForTests(): void {
  unavailableUntil = 0;
}
