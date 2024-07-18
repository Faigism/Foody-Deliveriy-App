import '../styles/globals.css'
import '../languages/lang'
import Provider from '../shared/services/provider'

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
