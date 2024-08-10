'use client'
import React, { useEffect, useState } from 'react'
import styles from './productCard.module.css'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import TransitionsModal from '../../TransitionsModal'
import { deleteProductById, getRestaurantById } from '../../../../services/axios'
import { toast } from 'react-toastify'

const ProductCard = ({ product, restaurant }) => {
  const [activateModal, setActivateModal] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [restaurantName, setRestaurantName] = useState("")
  const [productId, setProductId] = useState('')

  const getRestaurantName = async () => {
    const response = await getRestaurantById(product.rest_id);
    setRestaurantName(response.name)
  }

  const deleteProduct = async (id) => {
    const response = await deleteProductById(id);
    if (response.status == 204) {
      toast.success("Product successfully deleted")
    } else {
      toast.error(response.statusText)
    }
  }

  useEffect(() => {
    getRestaurantName();
  }, [])

  return (
    <div className={styles.productCard}>
      <div className="w-[163px] h-full py-5 flex flex-col justify-between relative">
        <div className="flex flex-col gap-2">
          <img
            src={product.img_url}
            alt="product image"
            style={{ width: '160px', height: '130px' }}
          />
          <div className={styles.productName}>{product.name}</div>
          <div className={styles.restaurantName}>{restaurant ? restaurant?.name : restaurantName}</div>
        </div>

        <div className="flex justify-between">
          <span className={styles.price}>${product.price}</span>
          <div className="flex gap-2">
            <div className={styles.edit}>
              <BorderColorIcon style={{ color: '#00B2A9' }} />
            </div>
            <div className={styles.delete}>
              <DeleteForeverIcon
                style={{ color: '#EB5757' }}
                onClick={() => {
                  setActivateModal(true)
                  setOpenModal(!openModal)
                  setProductId(product.id)
                }}
              />
            </div>
          </div>
        </div>
        <div className='absolute'>
          {activateModal && <TransitionsModal id={productId} deleteItem={deleteProduct} openModal={openModal} />}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
