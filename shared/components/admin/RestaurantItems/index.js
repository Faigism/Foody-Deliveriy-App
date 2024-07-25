'use client'

import React, { useEffect, useState } from 'react'
import RestaurantCard from './RestaurantCard/index'
import styles from './restaurantItems.module.css'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

const RestaurantItems = ({ restaurants, categoryName }) => {
  const itemsPerPage = 15
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)

  const startIndex = currentPage * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const subset = restaurants ? restaurants.slice(startIndex, endIndex) : []
  useEffect(() => {
    if (restaurants) {
      setTotalPages(Math.ceil(restaurants.length / itemsPerPage))
    }
  }, [restaurants, itemsPerPage])

  const paginated = (event, value) => {
    setCurrentPage(value - 1)
  }

  const main = {
    '& .MuiPaginationItem-root': {
      color: '#fff',
    },
  }

  return (
    <div className="flex flex-col items-center">
      <div className={styles.restaurants}>
        {subset?.map((restaurant, index) => (
          <div style={{ width: '252px', height: '120px' }} key={index}>
            <RestaurantCard
              restaurant={restaurant}
              categoryName={categoryName}
            />
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <Stack spacing={2} sx={{ marginTop: '70px' }}>
          <Pagination
            count={totalPages}
            color="secondary"
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

export default RestaurantItems
