'use client'

import React, { useState } from 'react'
import styles from './style.module.css'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import TransitionsModal from '../../TransitionsModal'

const RestaurantCard = ({ restaurant, categoryName }) => {
  const [activateModal, setActivateModal] = useState(false)
  const [restaurantId, setRestaurantId] = useState('')
  return (
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
        <div className={styles.edit}>
          <BorderColorIcon style={{ color: '#00B2A9' }} />
        </div>
      </div>
      {activateModal && <TransitionsModal id={restaurantId} />}
    </div>
  )
}

export default RestaurantCard
