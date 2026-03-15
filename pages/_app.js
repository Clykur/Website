// Minimal pages dir so Next.js generates pages-manifest.json (App Router handles all routes)
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
