import { useEffect, useRef, useState } from 'react'
import {
  deleteOfferById,
  getEditOffer,
  getOffer,
  putOffer,
} from '../../../services/axios'
import AdminLeftModal from '../adminLeftModal'
import { useGlobalStore } from '../../../services/provider'
import Modal from '../Modal'
import Button from '../Button'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import { toast } from 'react-toastify'

const AdminOffer = ({ item, setOfferData, offerData }) => {
  const { t } = useTranslation()
  const [isHiddenModal, setIsHiddenModal] = useState(true)
  const [image, setImage] = useState('')
  const imgRef = useRef(null)
  const addTitleRef = useRef(null)
  const addDescRef = useRef(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeId, setActiveId] = useState('')

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
        addDescRef.current.value = currentData?.description || ''
        imgRef.current.src = currentData?.img_url || ''
      }
    }
  }

  const { refresh, setRefresh } = useGlobalStore()

  const deleteOffer = async (id) => {
    const response = await deleteOfferById(id)
    if (response?.status === 204) {
      toast.success('Offer successfully deleted')
      setIsModalOpen(false)
      setRefresh(!refresh)
    }
  }

  const editOffer = async () => {
    const title = addTitleRef?.current?.value
    const description = addDescRef?.current?.value
    const img = imgRef?.current?.src

    const offerValues = {
      name: title,
      description,
      img_url: img,
    }

    if (!isInputValid(title, description, img)) {
      toast.warning('Please fill all the inputs!')
      return
    }

    const res = await putOffer(activeId, offerValues)

    if (res?.status === 200) {
      toast.success('Edit was successfully!')
      const updatedData = offerData.map((item) => {
        if (item.id === activeId) {
          return res.data.data
        }
        return item
      })
      setOfferData(updatedData)

      setTimeout(() => {
        changeHidden()
      }, 500)
    }
  }

  function isInputValid(title, description, img) {
    return !!title && !!description && !!img
  }

  return (
    <>
      <AdminLeftModal
        p="Edit Offer"
        p1="Upload Image"
        p2="Edit your Offer information"
        btn="Update Offer"
        imageUrl={handleAddNewImage}
        getImgUrl={handleAddNewImage}
        onClickClose={changeHidden}
        hidden={isHiddenModal}
        createOnClick={editOffer}
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
        <td className="whitespace-nowrap overflow-ellipsis overflow-hidden max-w-[150px] px-3">
          {/* <p className={`whitespace-nowrap overflow-ellipsis overflow-hidden w-[100px]  bg-grayText2  ${styles.description}`}> */}
          {item.description}
          {/* </p> */}
        </td>
        <td className=" h-14 flex  align-middle justify-center gap-5">
          <Image
            width="24"
            height="0"
            src="/adminMarqaritaEditButton.svg"
            alt=""
            className="cursor-pointer"
            onClick={() => handleEditClick(item.id)}
          />
          <Image
            width="24"
            height="0"
            src="/adminMarqaritaDeleteButton.svg"
            alt=""
            className="cursor-pointer"
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
            onClick={() => {
              deleteOffer(activeId)
            }}
          />
        </div>
      </Modal>
    </>
  )
}
export default AdminOffer
