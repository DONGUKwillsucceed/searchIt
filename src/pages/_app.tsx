import "../styles/globals.css";
import Head from "next/head";
import * as React from "react";
import { AppProps } from "next/app";
import { StoreProvider } from "easy-peasy";
import globalState from "../common/utils/globalState";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* <meta charset="utf-8" /> */}
        <title>Search It</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <StoreProvider store={globalState}>
        <Component {...pageProps} />
      </StoreProvider>
    </>
  );
}

export default MyApp;
