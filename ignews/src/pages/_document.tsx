import Document, {
  Head,
  Html,
  Main,
  NextScript,
} from "next/document"

export default class _document extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            rel="shortcut icon"
            href="images/favicon.png"
          />
          <link
            rel="preconnect"
            href="https://fonts.googleapis.com"
          />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
