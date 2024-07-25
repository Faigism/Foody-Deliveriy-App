import Head from 'next/head'
import ClientLayout from '../shared/components/layout/client/Header'
import Header from '../shared/components/client/header'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { getOffer } from '../shared/services/axios'
const Home = () => {
  const { t } = useTranslation()
  const [data, setData] = useState([])
  const getOfferData = async () => {
    const response = await getOffer()
    setData(response?.data.result.data)
  }
  useEffect(() => {
    getOfferData()
  }, [])
  return (
    <>
      <Head>
        <title>Foody | Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/mainBurger.svg" />
      </Head>
      <ClientLayout>
        <Header />
        <section className="flex flex-col gap-10 justify-center my-14 px-3">
          <div className="flex flex-col gap-6 items-center text-center">
            <h3 className=" text-5xl font-black">{t('homeDesc5')}</h3>
            <p className="w-full text-2xl text-grayText1">
              Lorem ipsum is placeholder text commonly used in the graphic,
              print, and publishing industries for previewing layouts and visual
              mockups.
            </p>
          </div>
          <div className="flex flex-col justify-center gap-16 items-center">
            <div className="flex flex-col gap-5 text-center pb-6 shadow-xl">
              <Image
                width={240}
                className="mx-auto"
                height={0}
                src={'discountCard.svg'}
                alt="discount"
              />
              <p className=" font-bold text-3xl text-grayText2">
                Discount Boucher
              </p>
              <p className=" w-2/3 mx-auto text-grayText1 text-lg">
                Lorem ipsum is placeholder commonly used in the graphic{' '}
              </p>
            </div>
            <div className="flex flex-col gap-5 text-center pb-6 shadow-xl">
              <Image
                width={240}
                className="mx-auto"
                height={0}
                src={'soupCard.svg'}
                alt="soup"
              />
              <p className=" font-bold text-3xl text-grayText2">
                Fresh healthy Food
              </p>
              <p className=" w-2/3 mx-auto text-grayText1 text-lg">
                Lorem ipsum is placeholder commonly used in the graphic{' '}
              </p>
            </div>
            <div className="flex flex-col gap-5 text-center pb-6 shadow-xl ">
              <Image
                width={210}
                className="mx-auto"
                height={0}
                src={'deliveryCard.svg'}
                alt="delivery"
              />
              <p className=" font-bold text-3xl text-grayText2">
                Fast Home Delivery
              </p>
              <p className=" w-2/3 mx-auto text-grayText1 text-lg">
                Lorem ipsum is placeholder commonly used in the graphic{' '}
              </p>
            </div>
          </div>
        </section>
        {data.map((item, index) => {
          if (index % 2 === 1) {
            return (
              <section
                key={item.name}
                className="flex flex-col gap-0 justify-center items-center px-3 mt-52"
              >
                <div className="flex flex-col gap-8 w-full">
                  <h4 className="text-5xl w-full font-black leading-tight text-center mx-auto sm:text-start">
                    {item.name}
                  </h4>
                  <p className="text-xl text-grayText1 w-full mb-8 mx-auto text-center">
                    {item.description}
                  </p>
                </div>
                <div>
                  <img
                    className="rounded-xl"
                    width={400}
                    height={400}
                    src={item.img_url}
                    alt="img"
                  />
                </div>
              </section>
            )
          }
          return (
            <section
              key={item.name}
              className="flex flex-col justify-center items-center px-3 mt-52"
            >
              <div className="flex flex-col gap-8 w-full">
                <h4 className="text-5xl w-full sm:text-6xl font-black leading-tight text-center mx-auto">
                  {item.name}
                </h4>
                <p className="text-xl text-grayText1 w-full mb-8 mx-auto text-center">
                  {item.description}
                </p>
              </div>
              <div>
                <img
                  className="rounded-xl"
                  width={400}
                  height={400}
                  src={item.img_url}
                  alt="img"
                />
              </div>
            </section>
          )
        })}
        <section className="flex flex-col gap-10 justify-center px-3 mb-96 mt-52">
          <div className="flex flex-col gap-6 items-center text-center">
            <h3 className=" text-5xl font-black w-full mt-20 leading-tight">
              {t('homeDesc9')}
            </h3>
            <p className="w-full text-2xl text-grayText1">
              Lorem ipsum is placeholder text commonly used in the graphic,
              print, and publishing industries for previewing layouts and visual
              mockups.
            </p>
          </div>
          <div className="flex flex-col justify-center gap-16 items-center">
            <div className="flex flex-col gap-5 text-center pb-6 shadow-xl ">
              <Image
                width={240}
                className="mx-auto"
                height={0}
                src={'burgerAnimation.svg'}
                alt="burger"
              />
              <p className=" font-bold text-3xl text-grayText2">Dubble Chees</p>
              <p className=" w-2/3 mx-auto text-grayText1 text-lg">
                Lorem ipsum is placeholder commonly used in the graphic{' '}
              </p>
            </div>
            <div className="flex flex-col gap-5 text-center pb-6 shadow-xl ">
              <Image
                width={190}
                className="mx-auto"
                height={0}
                src={'margaritaCard.svg'}
                alt="margarita"
              />
              <p className=" font-bold text-3xl text-grayText2">Margarita</p>
              <p className=" w-2/3 mx-auto text-grayText1 text-lg">
                Lorem ipsum is placeholder commonly used in the graphic{' '}
              </p>
            </div>
            <div className="flex flex-col gap-5 text-center pb-6 shadow-xl ">
              <Image
                width={240}
                className="mx-auto"
                height={0}
                src={'kfcCard.svg'}
                alt="kfc"
              />
              <p className=" font-bold text-3xl text-grayText2">Twister Menu</p>
              <p className=" w-2/3 mx-auto text-grayText1 text-lg">
                Lorem ipsum is placeholder commonly used in the graphic{' '}
              </p>
            </div>
          </div>
        </section>
      </ClientLayout>
    </>
  )
}
export default Home