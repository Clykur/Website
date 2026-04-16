import { Html, Head, Main, NextScript } from "next/document";

/**
 * Required alongside `pages/_app.js` so Next can resolve the Pages Router document
 * in this App Router + minimal `pages/` hybrid setup (avoids missing chunk / _document errors).
 */
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
