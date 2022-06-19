import '../styles/globals.css'
import Footer from './components/sections/Footer'
import NavBar from './components/sections/NavBar'

function MyApp({ Component, pageProps }) {
  return <>
  <NavBar /> 
  <Component {...pageProps} />
  <Footer />
  </>
}

export default MyApp
