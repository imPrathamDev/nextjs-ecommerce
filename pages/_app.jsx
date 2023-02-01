import "../styles/globals.css";
import "../styles/nprogress.css";
import "../styles/slider.css";
import Router from "next/router";
import nProgress from "nprogress";
import Context from "../context/Context";
import { Fragment } from "react";
import { SessionProvider } from "next-auth/react";
import { AnimatePresence } from "framer-motion";

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <Fragment>
      <AnimatePresence>
        <SessionProvider session={session}>
          <Context>
            <Component {...pageProps} />
          </Context>
        </SessionProvider>
      </AnimatePresence>
    </Fragment>
  );
}

export default MyApp;
