import '../styles/globals.css'
import '../languages/lang'
import Provider from '../shared/services/provider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Quicksand, Roboto } from '@next/font/google'
const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['400', '700'],
})

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <ToastContainer />
      <main className={quicksand.className}>
        <Component {...pageProps} />
      </main>
    </Provider>
  )
}

export default MyApp
