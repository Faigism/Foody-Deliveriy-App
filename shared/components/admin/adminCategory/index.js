import { useEffect, useRef, useState } from 'react'
import AdminLeftModal from '../adminLeftModal'
import { useTranslation } from 'react-i18next'
import {
  getCategoriesFromDB,
  getEditCategories,
  updateCategories,
} from '../../../services/axios'
import { useGlobalStore } from '../../../services/provider'
import Image from 'next/image'
import Modal from '../Modal'
import Button from '../Button'
const AdminCategory = ({ item }) => {
  const { t } = useTranslation()
  const [isHiddenModal, setIsHiddenModal] = useState(true)
  const [image, setImage] = useState('')
  const imgRef = useRef(null)
  const addCategoryName = useRef(null)
  const addCategorySlug = useRef(null)
  const { categoryData, setCategoryData } = useGlobalStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeId, setActiveId] = useState('')
  const fetchCategoryData = async () => {
    try {
      const res = await getCategoriesFromDB()
      setCategoryData(res)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchCategoryData()
  }, [])
  const handleAddNewImage = (image_url) => {
    setImage(image_url)
  }
  function changeHidden() {
    setIsHiddenModal((prev) => !prev)
  }
  const handleEditClick = async (id) => {
    setActiveId(id)
    changeHidden()
    const res = await getEditCategories(id)
    if (res?.status === 200) {
      const currentData = res?.data.result.data
      if (addCategoryName && addCategorySlug && imgRef) {
        addCategoryName.current.value = currentData?.name || ''
        addCategorySlug.current.value = currentData?.slug || ''
        imgRef.current.src = currentData?.img_url || ''
      }
    }
  }
  const handleModalClose = () => {
    setIsModalOpen(false)
  }
  const handleButtonClick = (id) => {
    setIsModalOpen(true)
    setActiveId(id)
  }
  return (
    <>
      <>
        <AdminLeftModal
          onClickClose={changeHidden}
          p={t('adminCategoryEdit')}
          p1={t('adminModalUploadImage')}
          p2={t('adminCategoryEditInformation')}
          hidden={isHiddenModal}
          btn={t('adminCategoryBtnEdit')}
          imageUrl={handleAddNewImage}
          addProductName={addCategoryName}
          addCategorySlug={addCategorySlug}
          imgRef={imgRef}
        />
        <tr
          className="text-center h-16  border-y border-gray-800 text-sm not-italic font-normal leading-6"
          key={item.id}
        >
          <td className="text-center max-w-[75px]   overflow-x-auto">
            <div className="flex  justify-center ">
              <p className="  border px-2 rounded-lg  ">{item.id}</p>
            </div>
          </td>
          <td className="flex justify-center items-center h-16">
            <img
              className=" object-cover"
              width="50"
              height="40"
              src={item.img_url}
              alt="categoryImg"
            />
          </td>
          <td className="max-w-64 text-center ">
            <p className="whitespace-nowrap max-w-64  text-center ">
              {item.name}
            </p>
          </td>
          <td className="max-w-64">
            <p className="whitespace-nowrap max-w-64">{item.slug}</p>
          </td>
          <td>
            <div className="flex justify-center items-right mx-3 gap-3">
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
            </div>
          </td>
        </tr>
      </>
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
          />
        </div>
      </Modal>
    </>
  )
}
export default AdminCategory