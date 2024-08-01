import { useTranslation } from 'react-i18next'
import { ToastContainer } from 'react-toastify'
import Modal from '../../admin/Modal'
import Button from '../button'
import { useState } from 'react'

const UserBasketCard = ({ imageSrc, price, count }) => {
  const { t } = useTranslation()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleButtonClick = () => {
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }
  return (
    <>
      <ToastContainer />
      <div className="flex relative sm:pr-9 justify-between items-center border-b-2 border-whiteLight2 py-8">
        <img width={96} height={0} src={imageSrc} alt={imageSrc} />

        <div className="flex flex-col w-full pl-7">
          <p className="font-medium text-grayText2 text-2xl">{name}</p>
          <p className="font-medium text-lg">${price}</p>
        </div>

        <div className="flex flex-col bg-whiteLight1 sm:bg-white py-1 px-3 rounded-full gap-3 items-center">
          <button>
            <img width={30} height={0} src={'/plus.svg'} alt="add" />
          </button>
          <p className="text-lg font-medium">{count}</p>
          <button>
            <img width={30} height={0} src={'/minus.svg'} alt="remove" />
          </button>
        </div>

        <span className="absolute top-0 left-0 sm:left-[97%] sm:top-4 w-8">
          <img
            className="cursor-pointer"
            onClick={handleButtonClick}
            width={30}
            height={0}
            src={'/delete.svg'}
            alt="delete"
          />
        </span>
      </div>

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
            // onClick={clearBasket}
          />
        </div>
      </Modal>
    </>
  )
}
export default UserBasketCard
