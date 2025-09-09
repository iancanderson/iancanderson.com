import { AppProps } from 'next/app'
import 'plyr/dist/plyr.css'
import '../styles/index.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
