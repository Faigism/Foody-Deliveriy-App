'use client'

import React, { useState } from 'react'
import styles from './restaurantsSidebar.module.css'
import { getRestaurants } from '../../../../services/axios'
import { useGlobalStore } from '../../../../services/provider'

const Sidebar = ({ categories }) => {
  const { setFilteredRestaurants } = useGlobalStore()
  const [itemIndex, setItemIndex] = useState(-1)

  const getRestaurantByCategoryId = async (categoryId) => {
    const response = await getRestaurants()
    const restaurants = response?.data.result.data
    const filteredRestaurants = restaurants?.filter((restaurant) => {
      return restaurant.category_id == categoryId
    })
    setFilteredRestaurants(filteredRestaurants)
  }
  return (
    <div className={styles.sidebar}>
      <ul className="my-8 mx-5">
        {categories?.map((category, index) => (
          <li
            className={`${
              itemIndex === index ? styles.active : ''
            } flex gap-3 my-8`}
            key={category.id}
            onClick={() => {
              setItemIndex(index)
              getRestaurantByCategoryId(category.id)
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
