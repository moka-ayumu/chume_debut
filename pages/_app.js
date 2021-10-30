import "../styles/globals.scss";
import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="description" content="Vtuber CHUME" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
