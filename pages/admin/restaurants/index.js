'use client'

import { useEffect, useRef, useState } from 'react'
import RestaurantItems from '../../../shared/components/admin/RestaurantItems'
import Subheading from '../../../shared/components/admin/Subheading'
import AdminLayout from '../../../shared/components/layout/admin'
import {
  getCategoriesFromDB,
  getCategoryById,
  getRestaurants,
} from '../../../shared/services/axios'
import { useTranslation } from 'react-i18next'
import AdminLeftModal from '../../../shared/components/admin/adminLeftModal'

const Restaurants = () => {
  const { t } = useTranslation()
  const [categories, setCategories] = useState([])
  const [categoriesModal, setCategoriesModal] = useState([])
  const [categoryName, setCategoryName] = useState('')
  const [restaurants, setRestaurants] = useState([])

  const showAllRestaurants = async () => {
    const allRestaurants = await getRestaurants()
    const restaurants = allRestaurants?.data.result.data
    setRestaurants(restaurants)
  }
  useEffect(() => {
    showAllRestaurants()
  }, [])

  const getRestaurantsByCategory = async (categoryId) => {
    const response = await getCategoryById(categoryId)
    setCategoryName(response.data.result.data.name)
    const restaurantsData = await getRestaurants()
    const restaurants = restaurantsData.data.result.data
    const filteredRestaurants = restaurants?.filter((restaurant) => {
      return restaurant.category_id == categoryId
    })
    setRestaurants(filteredRestaurants)
  }

  const getCategories = async () => {
    const categories = await getCategoriesFromDB()
    setCategories(categories)
  }

  const getCategoriesModal = async () => {
    const categories = await getCategoriesFromDB()
    const items = categories?.map((item) => item.name)
    setCategoriesModal(items)
  }

  const [isHiddenModal, setIsHiddenModal] = useState(true)
  const [image, setImage] = useState('')
  const img = useRef(null)
  const addRestaurantName = useRef(null)
  const addRestaurantCuisine = useRef(null)
  const addRestaurantDeliveryPrice = useRef(null)
  const addRestaurantDeliveryMin = useRef(null)
  const addRestaurantAddress = useRef(null)
  const addRestaurantCategory = useRef(null)

  const handleAddNewImage = (image_url) => {
    setImage(image_url)
  }
  function changeHidden() {
    setIsHiddenModal((prev) => !prev)
  }

  const fetchCategory = async () => {
    try {
      getCategories()
      getCategoriesModal()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCategory()
  }, [])

  return (
    <AdminLayout>
      <AdminLeftModal
        onClickClose={changeHidden}
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
      <Subheading
        text={t('adminLeftBarComponent3')}
        type={'Category'}
        add={t('addRestaurant')}
        state={categories}
        handleClick={getCategories}
        handleSearchByType={getRestaurantsByCategory}
        changeHidden={changeHidden}
      />
      <main style={{ margin: '0 25px 0 50px' }}>
        <RestaurantItems
          restaurants={restaurants}
          categoryName={categoryName}
        />
      </main>
    </AdminLayout>
  )
}
export default Restaurants
