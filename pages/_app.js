import '../styles/globals.css'
import '../styles/nprogress.css'
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../components/sections/Footer'
import NavBar from '../components/sections/NavBar'
import React, { useEffect } from 'react'
import Router from 'next/router'
import nProgress from 'nprogress'
import Context from '../context/Context'
import { Fragment } from 'react'
import { SessionProvider } from 'next-auth/react'

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);



function MyApp({ Component, pageProps: { session, ...pageProps },}) {
  return <Fragment>
  <SessionProvider session={session}>
  <Context >
  <NavBar /> 
  <Component {...pageProps} />
  <Footer />
  </Context>
  </SessionProvider>
  </Fragment>
}

export default MyApp;
