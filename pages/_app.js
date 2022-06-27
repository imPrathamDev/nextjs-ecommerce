import '../styles/globals.css'
import Footer from '../components/sections/Footer'
import NavBar from '../components/sections/NavBar'


//importing Context from Context.js file
import Context from '../context/Context'
import { Fragment } from 'react'

function MyApp({ Component, pageProps }) {
  return <Fragment>
  <Context >
  <NavBar /> 
  <Component {...pageProps} />
  <Footer />
  </Context>
  </Fragment>
}

export default MyApp;
