import { ChakraProvider } from '@chakra-ui/react';
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  let result = <Component {...pageProps} />

  result = <ChakraProvider>
    <Head>
      <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"/>
      <title>Norma Tek</title>
    </Head>

    {result}
  </ChakraProvider>

  return result;
}
