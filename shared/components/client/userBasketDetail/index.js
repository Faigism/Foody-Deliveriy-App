import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import UserBasketCard from '../userBasketCard'
import Modal from '../../admin/Modal'
import Button from '../button'
import {
  clearBasket,
  deleteItemFromBasket,
  postProductToBasket,
} from '../../../services/axios'
import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { useGlobalStore } from '../../../services/provider'

const UserBasketDetail = ({ data, itemsCount, setCheckout }) => {
  const { t } = useTranslation()
  const navigate = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { basketData, setBasketData, itemCount, setItemCount } =
    useGlobalStore()

  useEffect(() => {
    setBasketData(data)
  }, [data, itemsCount])

  const handleButtonClick = () => {
    setIsModalOpen(true)
  }
  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const handleIncreaseButtonClick = async (id) => {
    const res = await postProductToBasket(id)
    if (res?.status === 201) {
      setBasketData(res?.data)
    }
    setItemCount(itemCount + 1)
  }
  const handleDecreaseButtonClick = async (id) => {
    const res = await deleteItemFromBasket(id)
    if (res?.status === 200) {
      setBasketData(res?.data)
    }
    setItemCount(itemCount - 1)
  }
  const handleClearBasket = async (id) => {
    const res = await clearBasket(id)
    if (res?.status === 200) {
      setBasketData(res?.data)
      handleModalClose()
      toast.success('Cart cleared successfully!')
    }
    setItemCount(0)
  }

  return (
    <>
      <ToastContainer />
      {itemsCount === 0 ? (
        <>
          <div className="w-full flex flex-col px-3 sm:px-8 py-10 flex-wrap gap-0 sm:bg-whiteLight1">
            <h2 className="font-semibold text-3xl text-grayText2">
              {t('userDesc2')}
            </h2>
            <div className="flex items-center gap-2 border-b-2 border-whiteLight2 pb-4">
              <img
                width={20}
                height={0}
                src={'/basketIconGray.svg'}
                alt="basketIcon"
              />
              <p className="text-whiteLight3 font-medium">
                {itemsCount} {t('items')}
              </p>
            </div>

            <div className="flex flex-col items-center mx-auto my-5">
              <img width={200} height={0} src={'/emptyGray.svg'} alt="empty" />
              <Button
                onClick={() => {
                  navigate.push('/restaurants')
                }}
                className="text-lightRed font-medium text-xl hover:-translate-x-1 transition-all duration-200"
                innerText="&#10094; Restaurants"
              />
            </div>

            <div className="bg-whiteLight3 text-white flex items-center mt-8 justify-between pl-10 pr-2 py-2 rounded-full shadow-md">
              <p className="font-medium text-xl">{t('userDesc4')}</p>
              <Button
                className="bg-white text-whiteLight3 rounded-full py-1 px-14 font-medium text-lg"
                innerText="$0"
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="w-full flex flex-col px-3 sm:px-8 py-10 flex-wrap gap-0 sm:bg-whiteLight1">
            <h2 className="font-semibold text-3xl text-grayText2">
              {t('userDesc2')}
            </h2>
            <div className="flex items-center gap-2 border-b-2 border-whiteLight2 pb-4">
              <img
                width={20}
                height={0}
                src={'/basketIcon.svg'}
                alt="basketIcon"
              />
              <p className="text-mainRed font-medium">
                {itemsCount} {t('items')}
              </p>
            </div>
            <img
              className="cursor-pointer"
              onClick={handleButtonClick}
              width={30}
              height={0}
              src={'/delete.svg'}
              alt="delete"
            />

            <div className="mb-5 max-h-[189px] overflow-y-auto">
              {data?.items?.map((item, index) => {
                return (
                  <UserBasketCard
                    key={index}
                    decreaseBtn={() => handleDecreaseButtonClick(item?.id)}
                    increaseBtn={() => handleIncreaseButtonClick(item?.id)}
                    name={item?.name}
                    price={item?.amount}
                    count={item?.count}
                    imageSrc={item?.img_url}
                  />
                )
              })}
            </div>
            <div className="bg-mainRed text-white flex items-center mt-8 justify-between pl-10 pr-2 py-2 rounded-full shadow-md">
              <p className="font-medium text-xl">{t('userDesc4')}</p>
              <Button
                onClick={() => {
                  setCheckout(true)
                  navigate.push('/user-checkout')
                }}
                className="bg-white text-mainRed rounded-full py-1 px-14 font-medium text-lg hover:scale-95 transition-all duration-500"
                innerText={`$ ${data?.total_amount}`}
              />
            </div>
          </div>
        </>
      )}
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <div className="flex justify-between items-center">
          <p className="mx-auto text-2xl sm:text-3xl font-medium">
            {t('modalDesc')}
          </p>
          <Button
            className="text-mainRed text-lg"
            innerText="&#10006;"
            onClick={handleModalClose}
          />
        </div>

        <p className=" text-grayText1 w-2/3 mx-auto text-center my-5">
          {t('modalDesc2')}
        </p>

        <div className="mx-auto flex items-center justify-center gap-9">
          <Button
            className=" border-grayText1 text-grayText1 py-1 px-8 rounded-md border-2 shadow-md hover:scale-95 transition-all duration-500"
            innerText={t('modalDesc3')}
            onClick={handleModalClose}
          />
          <Button
            className="bg-mainRed border-2 text-white py-1 px-8 rounded-md border-mainRed shadow-md hover:scale-95 transition-all duration-500"
            innerText={t('modalDesc4')}
            onClick={() => handleClearBasket(data?.id)}
          />
        </div>
      </Modal>
    </>
  )
}
export default UserBasketDetail
