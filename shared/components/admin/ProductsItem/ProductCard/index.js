'use client'
import React, { useState } from 'react'
import styles from './productCard.module.css'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import TransitionsModal from '../../TransitionsModal'

const ProductCard = ({ product, restaurant }) => {
  const [activateModal, setActivateModal] = useState(false)
  return (
    <div className={styles.productCard}>
      <div className='w-[163px] h-[245px] flex flex-col justify-between'>
        <div className='flex flex-col gap-2'>
          <img
            src={product.img_url}
            alt='product image'
            style={{ width: '160px', height: '130px', objectFit: 'cover' }}
          />
          <div className={styles.productName}>{product.name}</div>
          <div className={styles.restaurantName}>{restaurant.name}</div>
        </div>

        <div className='flex justify-between'>
          <span className={styles.price}>${product.price}</span>
          <div className='flex gap-2'>
            <div className={styles.edit}>
              <BorderColorIcon style={{ color: '#00B2A9' }} />
            </div>
            <div className={styles.delete}>
              <DeleteForeverIcon
                style={{ color: '#EB5757' }}
                onClick={() => {
                  setActivateModal(true)
                }}
              />
            </div>
          </div>
        </div>
        {activateModal && <TransitionsModal />}
      </div>
    </div>
  )
}

export default ProductCard
