'use client'

import React, { useEffect, useRef, useState } from 'react'
import styles from './style.module.css'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import TransitionsModal from '../../TransitionsModal'
import { useTranslation } from 'react-i18next'
import {
  getCategoriesFromDB,
  getEditRestaurants,
  updateRestaurants,
} from '../../../../services/axios'
import AdminLeftModal from '../../adminLeftModal'
import { deleteRestaurantById } from '../../../../services/axios'
import { toast } from 'react-toastify'
import { useGlobalStore } from '../../../../services/provider'

const RestaurantCard = ({ restaurant }) => {
  const [activateModal, setActivateModal] = useState(false)
  const [restaurantId, setRestaurantId] = useState('')
  const [categoriesModal, setCategoriesModal] = useState([])
  const [openModal, setOpenModal] = useState(false)

  const { t } = useTranslation()
  const { restaurants, setRestaurants } = useGlobalStore()

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

    if (
      !isInputValid(
        resName,
        resCuisine,
        resDeliveryPrice,
        resDeliveryMin,
        resAddress,
        resCategoryId,
        resImgRef
      )
    ) {
      toast.dismiss()
      toast.warning('Please fill all the inputs!', {
        position: 'top-left',
        autoClose: 1000,
      })
      return
    }

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
      toast.success('Category updated successfully!', {
        autoClose: 1000,
      })

      const updatedData = restaurants.map((item) => {
        if (item.id === activeId) {
          return response.data.data
        }
        return item
      })
      setRestaurants(updatedData)
    }
  }

  function isInputValid(
    resName,
    resCuisine,
    resDeliveryPrice,
    resDeliveryMin,
    resAddress,
    resCategoryId,
    resImgRef
  ) {
    return (
      !!resName &&
      !!resCategoryId &&
      !!resImgRef &&
      !!resAddress &&
      !!resCuisine &&
      !!resDeliveryMin &&
      !!resDeliveryPrice
    )
  }

  const deleteRestaurant = async (id) => {
    const response = await deleteRestaurantById(id)
    if (response.status == 204) {
      toast.success('Restaurant successfully deleted', {
        autoClose: 1000,
      })
    } else {
      toast.error(response.statusText)
    }
  }

  const fetchCategory = async () => {
    try {
      const response = await getCategoriesFromDB()
      let items = response.map((item) => item.name)
      setCategoriesModal(items)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCategory()
  }, [])

  return (
    <>
      <AdminLeftModal
        onClickClose={changeHidden}
        createOnClick={UpdateRestaurants}
        p="Edit Restaurant"
        p1={t('adminModalUploadImage')}
        p2="Edit your restaurant information"
        hidden={isHiddenModal}
        imageUrl={handleAddNewImage}
        getImgUrl={handleAddNewImage}
        imgRef={img}
        addProductName={addRestaurantName}
        addRestaurantCuisine={addRestaurantCuisine}
        addRestaurantDeliveryPrice={addRestaurantDeliveryPrice}
        addRestaurantDeliveryMin={addRestaurantDeliveryMin}
        addRestaurantAddress={addRestaurantAddress}
        btn="Edit Restaurant"
        cateArr={categoriesModal}
        addRestaurantCategory={addRestaurantCategory}
      />
      <div className={styles.card}>
        <div className={styles.restaurantInfo}>
          <div className={styles.images}>
            <img
              src={restaurant.img_url}
              alt="restaurant logo"
              className={styles.restaurantCardImage}
            />
          </div>
          <div className="xxl:w-[120px] w-[100px]">
            <div className={styles.restaurantName}>{restaurant.name}</div>
            <div className={styles.category}>{restaurant.category_id}</div>
          </div>
        </div>

        <div className="flex flex-col justify-around me-[5px]">
          <div className={styles.delete}>
            <DeleteForeverIcon
              style={{ color: '#EB5757' }}
              onClick={() => {
                setActivateModal(true)
                setOpenModal(!openModal)
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
        {activateModal && (
          <TransitionsModal
            id={restaurantId}
            deleteItem={deleteRestaurant}
            openModal={openModal}
          />
        )}
      </div>
    </>
  )
}

export default RestaurantCard
