import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ClientLogin from '../../shared/components/client/login'
import Languages from '../../shared/components/admin/Languages'
import { ToastContainer } from 'react-toastify'

const Login = () => {
  const { t } = useTranslation()
  const navigate = useRouter()
  const [isModalOpen, setModalOpen] = useState(false)

  const toggleModal = () => {
    setModalOpen(!isModalOpen)
  }

  return (
    <>
      <ToastContainer />
      <Head>
        <title>Foody | Log in</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/mainBurger.svg" />
      </Head>

      <nav className="flex justify-between m-0 sm:m-8 items-center bg-lightRed py-11 px-5 sm:p-11">
        <h1
          className="text-4xl font-extrabold text-white
         flex items-center"
        >
          <button onClick={toggleModal} className="sm:hidden block mr-5">
            <Image
              width={40}
              height={0}
              src={'/hamburgerWhite.svg'}
              alt="hamburger"
            />
          </button>
          Foody
          <span className="text-white">.</span>
        </h1>

        <Languages />

        {isModalOpen && (
          <div className="fixed inset-0 bg-black m-0 min-h-screen bg-opacity-50 z-50 flex items-center justify-start">
            <div className="bg-white w-4/5 min-h-screen p-8 flex flex-col">
              <button
                className="text-mainRed font-bold text-lg block text-start"
                onClick={toggleModal}
              >
                <Image width={35} height={0} alt="close2" src={'/close2.svg'} />
              </button>

              <ul className="justify-around text-2xl w-full font-medium text-grayText1 flex flex-col mt-14 gap-4 ">
                <li
                  onClick={() => navigate.push('/')}
                  className="cursor-pointer hover:text-mainRed transition-all"
                >
                  {t('home')}
                </li>
                <li
                  onClick={() => navigate.push('/restaurants')}
                  className="cursor-pointer hover:text-mainRed transition-all"
                >
                  {t('restaurants')}
                </li>
                <li
                  onClick={() => navigate.push('/about-us')}
                  className="cursor-pointer hover:text-mainRed transition-all"
                >
                  {t('about_us')}
                </li>
                <li
                  onClick={() => navigate.push('/how-it-works')}
                  className="cursor-pointer hover:text-mainRed transition-all"
                >
                  {t('how_it_works')}
                </li>
                <li
                  onClick={() => navigate.push('/faqs')}
                  className="cursor-pointer hover:text-mainRed transition-all"
                >
                  FAQs
                </li>
              </ul>
            </div>
          </div>
        )}
      </nav>
      <main>
        <ClientLogin />
      </main>
    </>
  )
}
export default Login
