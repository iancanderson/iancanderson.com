import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body className="theme-brutal-2">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
