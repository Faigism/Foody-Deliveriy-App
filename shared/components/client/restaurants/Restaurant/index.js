'use client'
import React, { useEffect, useState } from 'react'
import styles from './restaurant.module.css'
import { getRestaurantById } from '../../../../services/axios'
import RestaurantProduct from './RestaurantProduct'
import RestaurantInfo from './RestaurantInfo'
import RestaurantBasket from './RestaurantBasket'

const Restaurant = ({ restaurantId }) => {
  const [selectedRestaurant, setSelectedRestaurant] = useState()
  const [loading, setLoading] = useState(false)

  const products = selectedRestaurant?.products
  const getRestaurant = async (id) => {
    const restaurant = await getRestaurantById(id)
    setSelectedRestaurant(restaurant)
    setLoading(true)
  }

  useEffect(() => {
    getRestaurant(restaurantId)
  }, [restaurantId])

  return (
    <>
      {loading ? (
        <div>
          <RestaurantInfo selectedRestaurant={selectedRestaurant} />
          <div className={styles.separator}></div>
          <div className="flex justify-between mx-20 mb-28">
            <div className={styles.products}>
              <div className={styles.title}>Products</div>
              {products &&
                products.map((product, index) => (
                  <RestaurantProduct
                    product={product}
                    index={index}
                    key={product.id}
                  />
                ))}
            </div>
            <div className={styles.basket}>
              <RestaurantBasket />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="loading"></h1>
        </div>
      )}
    </>
  )
}

export default Restaurant
