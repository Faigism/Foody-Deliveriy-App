'use client'

import React, { useState } from 'react'
import styles from './style.module.css'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import TransitionsModal from '../../TransitionsModal'
import { deleteRestaurantById } from '../../../../services/axios'

const RestaurantCard = ({ restaurant, categoryName }) => {
  const [activateModal, setActivateModal] = useState(false)
  const [restaurantId, setRestaurantId] = useState('')
  const [openModal, setOpenModal] = useState(false)

  const deleteRestaurant = async (id) => {
    const response = await deleteRestaurantById(id);
  }

  return (
    <div className={styles.card}>
      <div className={styles.restaurantInfo}>
        <div className={styles.image}>
          <img className={styles.restaurantCardImage}
            src={restaurant.img_url}
            alt="restaurant logo"
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
              setOpenModal(!openModal)
            }}
          />
        </div>
        <div className={styles.edit}>
          <BorderColorIcon style={{ color: '#00B2A9' }} />
        </div>
      </div>
      {activateModal && <TransitionsModal id={restaurantId} deleteItem={deleteRestaurant} openModal={openModal} />}
    </div>
  )
}

export default RestaurantCard
