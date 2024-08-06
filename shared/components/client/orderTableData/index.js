import { useTranslation } from 'react-i18next'
import Modal from '../../admin/Modal'
import Button from '../button'
import OrderTableDetail from '../orderTableDetail'
import { useEffect, useState } from 'react'
import { useGlobalStore } from '../../../services/provider'
import { deleteOrder } from '../../../services/axios'
import { toast } from 'react-toastify'

const TableData = ({ id, time, address, amount, payment, contact }) => {
  const { t } = useTranslation()
  const [showPopup, setShowPopup] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalOpen2, setIsModalOpen2] = useState(false)
  const { orderData, setOrderData } = useGlobalStore()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showPopup && !event.target.closest('.popup-container')) {
        setShowPopup(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [showPopup])

  const inDeleteOrder = async () => {
    const response = await deleteOrder(id)

    if (response?.status == 204) {
      let newData = orderData.filter((item) => item.id !== id)
      setOrderData(newData)
      handleModalClose()
      toast.success('Your order has been successfully deleted')
    }
  }

  const handleButtonClick = () => {
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const handleButtonClick2 = () => {
    setIsModalOpen2(true)
  }

  const handleModalClose2 = () => {
    setIsModalOpen2(false)
  }

  const togglePopup = (e) => {
    e.stopPropagation()
    setShowPopup(!showPopup)
  }

  const truncateText = (text, length) => {
    if (text.length > length) {
      return text.slice(0, length) + ' ...'
    }
    return text
  }

  const addressText =
    address.length > 20 ? (
      <span className="tooltip">
        {truncateText(address, 20)}
        <span className="tooltiptext">{address}</span>
      </span>
    ) : (
      address
    )

  return (
    <>
      <tr className="h-[100px]">
        <td className="py-2 px-4 border-b border-whiteLight3">{id}</td>
        <td className="py-2 px-4 border-b border-whiteLight3">{time} PM</td>
        <td className="py-2 px-0 sm:px-4 border-b border-whiteLight3 text-center w-60">
          {addressText}
        </td>
        <td className="py-2 px-4 border-b border-whiteLight3">${amount}</td>
        <td className="py-2 px-4 border-b border-whiteLight3">{payment}</td>
        <td className="py-2 px-4 border-b border-whiteLight3">+{contact}</td>
        <td className="py-2 px-4 border-b border-whiteLight3 w-[110px]">
          <div className="relative z-50 m-auto flex items-center justify-center">
            {!showPopup ? (
              <img
                className="cursor-pointer absolute sm:left-0 sm:relative"
                width={5}
                height={0}
                src={'3dots.svg'}
                alt="3dots"
                onClick={togglePopup}
              />
            ) : (
              <div className="right-16 w-max bg-whiteLight1 shadow-md rounded-md p-2 flex flex-col items-center justify-center gap-1">
                <Button
                  className="text-[#14ae5c] cursor-pointer hover:text-[#109850]"
                  innerText={t('userDesc11')}
                  onClick={handleButtonClick2}
                />
                <hr className="w-full text-grayText1" />
                <Button
                  className="text-lightRed cursor-pointer hover:text-mainRed"
                  innerText={t('userDesc12')}
                  onClick={handleButtonClick}
                />
              </div>
            )}
          </div>
        </td>
      </tr>

      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <div className="flex justify-center items-center">
          <p className="mx-auto text-2xl sm:text-3xl font-medium">
            {t('modalDesc')}
          </p>
          <Button
            className="text-mainRed text-lg mr-1 sm:mr-0"
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
            onClick={inDeleteOrder}
            className="bg-mainRed border-2 text-white py-1 px-8 rounded-md border-mainRed shadow-md hover:scale-95 transition-all duration-500"
            innerText={t('modalDesc4')}
          />
        </div>
      </Modal>

      <Modal isOpen={isModalOpen2} onClose={handleModalClose2}>
        <OrderTableDetail id={id} />
        <Button
          className="mt-4 border-grayText1 text-grayText1 py-1 px-8 rounded-md border-2 shadow-md hover:scale-95 transition-all duration-500"
          innerText={t('userOrder6')}
          onClick={handleModalClose2}
        />
      </Modal>
    </>
  )
}
export default TableData
