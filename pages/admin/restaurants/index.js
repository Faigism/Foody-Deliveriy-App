'use client'

import { useEffect, useRef, useState } from 'react'
import RestaurantItems from '../../../shared/components/admin/RestaurantItems'
import Subheading from '../../../shared/components/admin/Subheading'
import AdminLayout from '../../../shared/components/layout/admin'
import {
  getCategoriesFromDB,
  getCategoryById,
  getRestaurants,
  postRestaurants,
} from '../../../shared/services/axios'
import { useTranslation } from 'react-i18next'
import AdminLeftModal from '../../../shared/components/admin/adminLeftModal'
import AuthCheck from '../../../shared/components/admin/authCheck'
import { toast } from 'react-toastify'
import { useGlobalStore } from '../../../shared/services/provider'

const Restaurants = () => {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState([])
  const [categoriesModal, setCategoriesModal] = useState([])
  const [categoryName, setCategoryName] = useState('')
  const { restaurants, setRestaurants } = useGlobalStore()
  const { refresh } = useGlobalStore()

  const showAllRestaurants = async () => {
    const allRestaurants = await getRestaurants()
    const restaurants = allRestaurants?.data.result.data
    setRestaurants(restaurants)
    setLoading(false)
  }
  useEffect(() => {
    showAllRestaurants()
  }, [refresh])

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

  const [isHiddenModal, setIsHiddenModal] = useState(true)
  const [image, setImage] = useState('')
  const imgRef = useRef(null)
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
      const response = await getCategoriesFromDB()
      let items = response.map((item) => item.name)
      setCategoriesModal(items)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategory()
  }, [])

  const addRestaurants = async () => {
    const ResName = addRestaurantName?.current?.value
    const cuisine = addRestaurantCuisine?.current?.value
    const delivery_price = addRestaurantDeliveryPrice?.current?.value
    const delivery_min = addRestaurantDeliveryMin?.current?.value
    const address = addRestaurantAddress?.current?.value
    const category_id = addRestaurantCategory?.current?.value
    const img = image

    if (
      !isInputValid(
        ResName,
        cuisine,
        delivery_price,
        delivery_min,
        address,
        category_id,
        img
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
      name: ResName,
      category_id: category_id,
      img_url: img,
      cuisine: cuisine,
      address: address,
      delivery_min: delivery_min,
      delivery_price: delivery_price,
    }

    try {
      const res = await postRestaurants(form)

      if (res?.status === 201) {
        setRestaurants((prev) => [...prev, res.data])
        if (
          addRestaurantName?.current &&
          addRestaurantCuisine?.current &&
          addRestaurantDeliveryPrice?.current &&
          addRestaurantDeliveryMin?.current &&
          addRestaurantAddress?.current &&
          addRestaurantCategory?.current
        ) {
          addRestaurantName.current.value = ''
          addRestaurantCuisine.current.value = ''
          addRestaurantDeliveryPrice.current.value = ''
          addRestaurantDeliveryMin.current.value = ''
          addRestaurantAddress.current.value = ''
          addRestaurantCategory.current.value = ''
        }

        if (imgRef.current) {
          imgRef.current.src = '/noimg.png'
          setImage('')
        }

        setTimeout(() => {
          changeHidden()
        }, 500)

        toast.success('Restaurant created successfully!', {
          autoClose: 1000,
        })
      }
    } catch (error) {
      console.error('Error adding category:', error)
      toast.error('An error occurred while adding the restaurant.')
    }
  }

  function isInputValid(
    Resname,
    category_id,
    img_url,
    cuisine,
    address,
    delivery_min,
    delivery_price
  ) {
    return (
      !!Resname &&
      !!category_id &&
      !!img_url &&
      !!address &&
      !!cuisine &&
      !!delivery_min &&
      !!delivery_price
    )
  }

  const handleSelectChange = (e) => {
    const value = e.target.value
    if (value == 'all') {
      setRestaurants(restaurants)
      return
    }
    let newValue = restaurants.filter((item) => item?.category_id == value)
    setRestaurants(newValue)
  }

  return (
    <AuthCheck>
      <AdminLayout>
        <AdminLeftModal
          onClickClose={changeHidden}
          createOnClick={addRestaurants}
          p={t('resAdd')}
          p1={t('adminModalUploadImage')}
          p2={t('adminModalRestaurantInformation')}
          hidden={isHiddenModal}
          imageUrl={handleAddNewImage}
          getImgUrl={handleAddNewImage}
          imgRef={imgRef}
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
          callBackValue={handleSelectChange}
          state={categories}
          handleClick={getCategories}
          handleSearchByType={getRestaurantsByCategory}
          changeHidden={changeHidden}
        />
        {!loading ? (
          <main style={{ margin: '0 25px 0 50px' }}>
            <RestaurantItems restaurants={restaurants} />
          </main>
        ) : (
          <div className="h-60 flex items-center justify-center">
            <div className="loading"></div>
          </div>
        )}
      </AdminLayout>
    </AuthCheck>
  )
}
export default Restaurants
