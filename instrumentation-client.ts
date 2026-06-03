// This file configures the initialization of Sentry on the client.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: "https://e165d67fe64d83b6efcc83bae16a5969@o4511382839230464.ingest.us.sentry.io/4511382844080128",
    integrations: [Sentry.replayIntegration()],
    tracesSampleRate: 1,
    enableLogs: true,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    sendDefaultPii: true,
  });
}

export const onRouterTransitionStart =
  process.env.NODE_ENV === "production"
    ? Sentry.captureRouterTransitionStart
    : () => {};
