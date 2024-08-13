'use client'

import React, { useEffect, useState } from 'react'
import styles from './restaurantsSidebar.module.css'
import { getRestaurants } from '../../../../services/axios'
import { useGlobalStore } from '../../../../services/provider'

const Sidebar = ({ categories }) => {
  const { setFilteredRestaurants } = useGlobalStore()
  const [itemIndex, setItemIndex] = useState(-1)

  useEffect(() => {
    getAllRestaurant()
  }, [])

  const getRestaurantByCategoryId = async (categoryId) => {
    const response = await getRestaurants()
    const restaurants = response?.data.result.data
    const filteredRestaurants = restaurants?.filter((restaurant) => {
      return restaurant.category_id == categoryId
    })
    setFilteredRestaurants(filteredRestaurants)
  }

  const getAllRestaurant = async () => {
    const response = await getRestaurants()
    const restaurants = response?.data.result.data
    setFilteredRestaurants(restaurants)
  }

  return (
    <div className={styles.sidebar}>
      <ul className="my-8 mx-5">
        <li
          style={{ paddingLeft: '45px' }}
          className={`${itemIndex === -1 ? styles.active : ''}`}
          onClick={() => {
            setItemIndex(-1)
            getAllRestaurant()
          }}
        >
          All
        </li>
        {categories?.map((category, index) => (
          <li
            className={`${
              itemIndex === index ? styles.active : ''
            } flex gap-3 my-8`}
            key={category.id}
            onClick={() => {
              setItemIndex(index)
              getRestaurantByCategoryId(category.name)
            }}
          >
            <img src={category.img_url} />
            <p>{category.name}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar
