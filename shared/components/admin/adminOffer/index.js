import { useEffect, useRef, useState } from 'react'
import { getEditOffer, getOffer } from '../../../services/axios'
import AdminLeftModal from '../adminLeftModal'
import { useGlobalStore } from '../../../services/provider'
import Modal from '../Modal'
import Button from '../Button'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'
const AdminOffer = ({ item }) => {
  const { t } = useTranslation()
  const [isHiddenModal, setIsHiddenModal] = useState(true)
  const [image, setImage] = useState('')
  const imgRef = useRef(null)
  const addTitleRef = useRef(null)
  const addDescRef = useRef(null)
  const { offerData, setOfferData } = useGlobalStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeId, setActiveId] = useState('')
  const fetchOfferData = async () => {
    try {
      const res = await getOffer()
      setOfferData(res)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchOfferData()
  }, [])
  const handleModalClose = () => {
    setIsModalOpen(false)
  }
  const handleButtonClick = (id) => {
    setIsModalOpen(true)
    setActiveId(id)
  }
  const handleAddNewImage = (image_url) => {
    setImage(image_url)
  }
  function changeHidden() {
    setIsHiddenModal((prev) => !prev)
  }
  const handleEditClick = async (id) => {
    setActiveId(id)
    changeHidden()
    const res = await getEditOffer(id)
    if (res?.status === 200) {
      const currentData = res?.data.result.data
      if (addTitleRef && addDescRef && imgRef) {
        addTitleRef.current.value = currentData?.name || ''
        addDescRef.current.value = currentData?.slug || ''
        imgRef.current.src = currentData?.img_url || ''
      }
    }
  }
  return (
    <>
      <AdminLeftModal
        p="Edit Offer  "
        p1="Upload Image"
        p2="Edit your Offer information"
        btn="Update Offer"
        imageUrl={handleAddNewImage}
        onClickClose={changeHidden}
        hidden={isHiddenModal}
        // ButtonOnClick={editOffer}
        imgRef={imgRef}
        addProductName={addTitleRef}
        addDescRef={addDescRef}
      />
      <tr className="h-14 text-center  border-slate-700  border-y text-gray-900 text-sm not-italic font-normal leading-5 ">
        <td>{item.id}</td>
        <td className=" flex justify-center items-center">
          <img
            width="60"
            height="0"
            src={item.img_url}
            alt=""
            className=" cursor-pointer"
            onClick={() => handleButtonClick(item.id)}
          />
        </td>
        <td>{item.name}</td>
        <td>
          <p className="whitespace-nowrap overflow-x-scroll  max-w-56 ">
            {item.description}
          </p>
        </td>
        <td className=" h-14 flex  align-middle justify-evenly">
          <Image
            width="24"
            height="0"
            src="/adminMarqaritaEditButton.svg"
            alt=""
            className=" cursor-pointer"
            onClick={() => handleEditClick(item.id)}
          />
          <Image
            width="24"
            height="0"
            src="/adminMarqaritaDeleteButton.svg"
            alt=""
            className=" cursor-pointer"
            onClick={() => handleButtonClick(item.id)}
          />
        </td>
      </tr>
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <div className="flex justify-between items-center">
          <p className="mx-auto text-3xl font-medium">{t('modalDesc')}</p>
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
            // onClick={removeOffer}
          />
        </div>
      </Modal>
    </>
  )
}
export default AdminOffer