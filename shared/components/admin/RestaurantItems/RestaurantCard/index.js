'use client'

import React, { useRef, useState } from 'react'
import styles from './style.module.css'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import TransitionsModal from '../../TransitionsModal'
import { useTranslation } from 'react-i18next'
import {
  getEditRestaurants,
  updateRestaurants,
} from '../../../../services/axios'
import AdminLeftModal from '../../adminLeftModal'

const RestaurantCard = ({ restaurant, categoryName }) => {
  const [activateModal, setActivateModal] = useState(false)
  const [restaurantId, setRestaurantId] = useState('')
  const [categoriesModal, setCategoriesModal] = useState([])

  const { t } = useTranslation()
  const [restaurants, setRestaurants] = useState([])

  const [activeId, setActiveId] = useState('')
  const [isHiddenModal, setIsHiddenModal] = useState(true)
  const [image, setImage] = useState('')
  const img = useRef(null)
  const addRestaurantName = useRef(null)
  const addRestaurantCuisine = useRef(null)
  const addRestaurantDeliveryPrice = useRef(null)
  const addRestaurantDeliveryMin = useRef(null)
  const addRestaurantAddress = useRef(null)
  const addRestaurantCategory = useRef(null)

  const handleButtonClick = (id) => {
    setIsModalOpen(true)
    setActiveId(id)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
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
    const res = await getEditRestaurants(id)

    if (res?.status === 200) {
      const currentData = res?.data.result.data

      if (
        addRestaurantName &&
        addRestaurantCuisine &&
        addRestaurantDeliveryPrice &&
        addRestaurantDeliveryMin &&
        addRestaurantAddress &&
        addRestaurantCategory &&
        img
      ) {
        addRestaurantName.current.value = currentData?.name || ''
        addRestaurantCuisine.current.value = currentData?.cuisine || ''
        addRestaurantDeliveryPrice.current.value =
          currentData?.delivery_price || ''
        addRestaurantDeliveryMin.current.value = currentData?.delivery_min || ''
        addRestaurantAddress.current.value = currentData?.address || ''
        addRestaurantCategory.current.value = currentData?.category_id || ''
        img.current.src = currentData?.img_url || ''
      }
    }
  }

  const UpdateRestaurants = async () => {
    const resName = addRestaurantName?.current?.value
    const resCuisine = addRestaurantCuisine?.current?.value
    const resDeliveryPrice = addRestaurantDeliveryPrice?.current?.value
    const resDeliveryMin = addRestaurantDeliveryMin?.current?.value
    const resAddress = addRestaurantAddress?.current?.value
    const resCategoryId = addRestaurantCategory?.current?.value
    const resImgRef = img?.current?.src

    const form = {
      name: resName,
      cuisine: resCuisine,
      delivery_price: resDeliveryPrice,
      delivery_min: resDeliveryMin,
      address: resAddress,
      category_id: resCategoryId,
      img_url: resImgRef,
    }

    const response = await updateRestaurants(activeId, form)

    if (response?.status === 200 || response?.status === 201) {
      setTimeout(() => {
        changeHidden()
      }, 500)
      toast.success('Category updated successfully!')

      const updatedData = restaurants.map((item) => {
        if (item.id === activeId) {
          return response.data.data
        }
        return item
      })
      setRestaurants(updatedData)
    }
  }

  return (
    <>
      <AdminLeftModal
        onClickClose={changeHidden}
        createOnClick={UpdateRestaurants}
        p={t('resAdd')}
        p1={t('adminModalUploadImage')}
        p2={t('adminModalRestaurantInformation')}
        hidden={isHiddenModal}
        imageUrl={handleAddNewImage}
        getImgUrl={handleAddNewImage}
        imgRef={img}
        addProductName={addRestaurantName}
        addRestaurantCuisine={addRestaurantCuisine}
        addRestaurantDeliveryPrice={addRestaurantDeliveryPrice}
        addRestaurantDeliveryMin={addRestaurantDeliveryMin}
        addRestaurantAddress={addRestaurantAddress}
        btn={t('resCreate')}
        cateArr={categoriesModal}
        addRestaurantCategory={addRestaurantCategory}
      />
      <div className={styles.card}>
        <div className={styles.restaurantInfo}>
          <div>
            <img
              src={restaurant.img_url}
              alt="restaurant logo"
              width={100}
              height={57}
              quality={100}
            />
          </div>
          <div>
            <div className={styles.restaurantName}>{restaurant.name}</div>
            <div className={styles.category}>{categoryName}</div>
          </div>
        </div>

        <div className="flex flex-col justify-around me-[5px]">
          <div className={styles.delete}>
            <DeleteForeverIcon
              style={{ color: '#EB5757' }}
              onClick={() => {
                setActivateModal(true)
                setRestaurantId(restaurant.id)
              }}
            />
          </div>
          <div
            className={styles.edit}
            onClick={() => handleEditClick(restaurant.id)}
          >
            <BorderColorIcon style={{ color: '#00B2A9' }} />
          </div>
        </div>
        {activateModal && <TransitionsModal id={restaurantId} />}
      </div>
    </>
  )
}

export default RestaurantCard
