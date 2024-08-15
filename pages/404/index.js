import Head from 'next/head'
import ClientLayout from '../../shared/components/layout/client/Header'

const Error = () => {
  return (
    <>
      <Head>
        <title>Foody | About</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/mainBurger.svg" />
      </Head>

      <ClientLayout>
        <div className="flex justify-center items-center">
          <img
            src={'/404.svg'}
            alt="404"
            style={{ width: '96%' }}
            className="h-screen"
          />
        </div>
      </ClientLayout>
    </>
  )
}
export default Error
