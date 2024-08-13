'use client'
import React, { useEffect, useRef, useState } from 'react'
import styles from './productCard.module.css'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import TransitionsModal from '../../TransitionsModal'
import {
  deleteProductById,
  getProducts,
  getRestaurants,
  updateProduct,
} from '../../../../services/axios'
import { toast } from 'react-toastify'
import AdminLeftModal from '../../adminLeftModal'
import { useTranslation } from 'react-i18next'
import { useGlobalStore } from '../../../../services/provider'

const ProductCard = ({ prd }) => {
  const { t } = useTranslation()
  const [activateModal, setActivateModal] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [productId, setProductId] = useState('')
  const [isHiddenModal, setIsHiddenModal] = useState(true)
  const [restaurants, setRestaurants] = useState()
  const { products, setProducts } = useGlobalStore()

  const [image, setImage] = useState('')
  const addProductName = useRef(null)
  const addProductPrice = useRef(null)
  const addProductDesc = useRef(null)
  const addProductRestaurant = useRef(null)
  const imgRef = useRef(null)

  const getRestaurantName = async () => {
    const res = await getRestaurants()
    let items = res?.data.result.data.map((item) => item.name)
    setRestaurants(items)
  }

  const handleAddNewImage = (image_url) => {
    setImage(image_url)
  }

  function changeHidden() {
    setIsHiddenModal((prev) => !prev)
  }

  const handleEdit = async () => {
    changeHidden()
    const res = await getProducts()

    if (res?.status === 200) {
      const currentData = res?.data?.result.data

      const filteredProduct = currentData.filter((item) => item?.id == prd.id)

      if (filteredProduct) {
        addProductName.current.value = filteredProduct[0]?.name || ''
        addProductDesc.current.value = filteredProduct[0]?.description || ''
        addProductPrice.current.value = filteredProduct[0]?.price || ''
        addProductRestaurant.current.value = filteredProduct[0]?.rest_id || ''
        imgRef.current.src = filteredProduct[0]?.img_url || ''
      }
    }
  }

  const editProduct = async () => {
    const productName = addProductName?.current?.value
    const productPrice = addProductPrice?.current?.value
    const productDesc = addProductDesc?.current?.value
    const productRestaurant = addProductRestaurant?.current?.value
    const prdImg = imgRef.current?.src

    const productValues = {
      name: productName,
      description: productDesc,
      img_url: prdImg,
      rest_id: productRestaurant,
      price: productPrice,
    }

    if (
      !isInputValid(
        productName,
        productDesc,
        prdImg,
        productRestaurant,
        productPrice
      )
    ) {
      toast.dismiss()
      toast.warning('Please fill the correctly!', {
        position: 'top-left',
      })
      return
    }

    const res = await updateProduct(prd.id, productValues)

    if (res?.status === 200 || res?.status === 201) {
      setTimeout(() => {
        changeHidden()
      }, 500)
      toast.success('Product update successfully!')

      const updatedData = products.map((item) => {
        if (item?.id === prd.id) {
          return res.data.data
        }
        return item
      })
      setProducts(updatedData)
    }
  }

  function isInputValid(
    productName,
    productPrice,
    productDesc,
    productRestaurant,
    prdImg
  ) {
    return (
      !!productName &&
      !!productPrice &&
      !!productDesc &&
      !!productRestaurant &&
      !!prdImg
    )
  }

  const deleteProduct = async () => {
    const res = await deleteProductById(prd.id)
    if (res?.status == 204) {
      let newProduct = products?.filter((item) => item?.id !== prd.id)
      setProducts(newProduct)
      toast.success('Deleted Successfully!')
    }
  }

  useEffect(() => {
    getRestaurantName()
  }, [])

  return (
    <>
      <AdminLeftModal
        onClickClose={changeHidden}
        createOnClick={editProduct}
        p="Edit Product"
        p1={t('adminModalUploadImage')}
        p2="Edit your product information"
        hidden={isHiddenModal}
        imageUrl={handleAddNewImage}
        getImgUrl={handleAddNewImage}
        imgRef={imgRef}
        addProductName={addProductName}
        addProductDesc={addProductDesc}
        addProductPrice={addProductPrice}
        addProductRestaurant={addProductRestaurant}
        btn="Edit Product"
        cateArr={restaurants}
      />
      <div className={styles.productCard}>
        <div className="w-[163px] h-full py-5 flex flex-col justify-between relative">
          <div className="flex flex-col gap-2">
            <img
              src={prd.img_url}
              alt="product image"
              style={{ width: '160px', height: '130px' }}
              className="object-cover"
            />
            <div className={styles.productName}>{prd.name}</div>
            <div className={styles.restaurantName}>{prd.rest_id}</div>
          </div>

          <div className="flex justify-between">
            <span className={styles.price}>${prd.price}</span>
            <div className="flex gap-2">
              <div className={styles.edit}>
                <BorderColorIcon
                  style={{ color: '#00B2A9' }}
                  onClick={handleEdit}
                />
              </div>
              <div className={styles.delete}>
                <DeleteForeverIcon
                  style={{ color: '#EB5757' }}
                  onClick={() => {
                    setActivateModal(true)
                    setOpenModal(!openModal)
                    setProductId(prd.id)
                  }}
                />
              </div>
            </div>
          </div>
          <div className="absolute">
            {activateModal && (
              <TransitionsModal
                id={productId}
                deleteItem={deleteProduct}
                openModal={openModal}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductCard
