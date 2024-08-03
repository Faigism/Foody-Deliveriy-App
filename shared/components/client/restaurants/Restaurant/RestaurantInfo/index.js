import React from 'react'
import styles from './restaurantInfo.module.css'
import { useRouter } from 'next/router'

const RestaurantInfo = ({ selectedRestaurant }) => {
  const router = useRouter()
  const goBack = () => {
    router.push(`/restaurants`)
  }
  return (
    <div className={styles.common}>
      <img
        src={selectedRestaurant?.img_url}
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        alt="restImg"
      />
      <div className={styles.info}>
        <div>
          <div className={styles.restaurantName}>
            {selectedRestaurant?.name}
          </div>
          <div className={styles.address}>{selectedRestaurant?.address}</div>
        </div>
        <div className="flex">
          <div className="w-[400px] flex  flex-col items-end pe-5">
            <div className={styles.cuisineTitle}>Cuisine</div>
            <div className={styles.cuisine}>{selectedRestaurant?.cuisine}</div>
          </div>
          <div className="flex gap-5">
            <div className={styles.delivery}>
              <div>${selectedRestaurant?.delivery_price}</div>
              <div>Delivery</div>
            </div>
            <div>
              <button
                className={styles.back}
                onClick={() => {
                  goBack()
                }}
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RestaurantInfo
