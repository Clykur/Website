import type { AppProps } from "next/app";

/** Minimal Pages Router shell so the server build always emits `pages-manifest.json` (App Router owns real routes). */
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
