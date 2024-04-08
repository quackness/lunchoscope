import { SessionProvider } from "next-auth/react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import Head from "next/head";
import 'react-datepicker/dist/react-datepicker.css';
import { UserProvider } from "@/Context/userAuth";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    // Context
    <UserProvider>
      <SessionProvider session={session}>
        <Head>
          <title>Lunchoscope</title>
          <meta name="description" content="Bamboo Express" />
          {/* <link rel="icon" href="🔮" /> */}
          <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🔮</text></svg>"></link>
        </Head>
        <Component {...pageProps} />
      </SessionProvider>
    </UserProvider>
  );
}
