'use client'

import React, { useEffect, useState } from 'react'
import styles from './restaurantMain.module.css'
import RestaurantCard from '../RestaurantCard'
import { useGlobalStore } from '../../../../services/provider'
import { Pagination, Stack } from '@mui/material'
import { getRestaurants } from '../../../../services/axios'

const Main = () => {
  const { filteredRestaurants } = useGlobalStore()
  const [restaurants, setRestaurants] = useState([])

  const itemsPerPage = 8
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)

  const startIndex = currentPage * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const subset =
    filteredRestaurants.length > 0
      ? filteredRestaurants.slice(startIndex, endIndex)
      : restaurants?.slice(startIndex, endIndex)
  const allRestaurants = async () => {
    const response = await getRestaurants()
    const restaurants = response?.data.result.data
    setRestaurants(restaurants)
  }

  useEffect(() => {
    allRestaurants()
    if (filteredRestaurants?.length > 0) {
      setTotalPages(Math.ceil(filteredRestaurants?.length / itemsPerPage))
    } else {
      setTotalPages(Math.ceil(restaurants?.length / itemsPerPage))
    }
  }, [filteredRestaurants, itemsPerPage, restaurants])

  const paginated = (event, value) => {
    setCurrentPage(value - 1)
  }

  const main = {
    '& .MuiPaginationItem-root': {
      color: '#151515',
    },
  }
  return (
    <div className="my-8 flex flex-1 items-center flex-col">
      <div className="flex flex-1 flex-wrap justify-around gap-x-20">
        {subset?.map((restaurant, index) => (
          <RestaurantCard restaurant={restaurant} key={restaurant.id} />
        ))}
      </div>
      {totalPages > 1 && (
        <Stack spacing={2} sx={{ marginTop: '70px' }}>
          <Pagination
            count={totalPages}
            // color='secondary'
            sx={main}
            size="large"
            style={{ color: 'white' }}
            onChange={paginated}
          />
        </Stack>
      )}
    </div>
  )
}

export default Main
