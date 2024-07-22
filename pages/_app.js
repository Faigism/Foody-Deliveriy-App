import '../styles/globals.css'
import '../languages/lang'
import Provider from '../shared/services/provider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <ToastContainer />
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
