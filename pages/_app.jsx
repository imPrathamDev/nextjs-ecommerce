import "../styles/globals.css";
import "../styles/nprogress.css";
import "../styles/slider.css";
import "react-toastify/dist/ReactToastify.css";
import Router from "next/router";
import nProgress from "nprogress";
import Context from "../context/Context";
import { Fragment } from "react";
import { SessionProvider } from "next-auth/react";
import { AnimatePresence } from "framer-motion";
import Script from "next/script";

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <Fragment>
      <Script
        type="text/javascript"
        async
        src="https://tenor.com/embed.js"
      ></Script>
      <AnimatePresence exitBeforeEnter>
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
