'use client'
import React, { useEffect, useState } from 'react'
import styles from './restaurant.module.css'
import { getProducts, getRestaurants } from '../../../../services/axios'
import RestaurantProduct from './RestaurantProduct'
import RestaurantInfo from './RestaurantInfo'
import RestaurantBasket from './RestaurantBasket'

const Restaurant = ({ restaurantId }) => {
  const [selectedRestaurant, setSelectedRestaurant] = useState()
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])

  const getRestaurant = async () => {
    try {
      const res = await getRestaurants()
      const resArr = res?.data.result.data
      const newResult = resArr.find((item) => item.id === restaurantId)
      setSelectedRestaurant(newResult)
      setLoading(true)
    } catch (error) {
      console.error('Error fetching restaurant:', error)
      setLoading(true)
    }
  }

  const fetchProducts = async () => {
    try {
      const res = await getProducts()
      const resArr = res?.data.result.data
      const focusProduct = resArr.filter(
        (item) => item.rest_id === selectedRestaurant?.name
      )
      setProducts(focusProduct)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  useEffect(() => {
    getRestaurant()
  }, [restaurantId])

  useEffect(() => {
    if (selectedRestaurant) {
      fetchProducts()
    }
  }, [selectedRestaurant])

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
