import React from 'react'
import RestaurantCard from './restaurantCard'
import styles from './restaurantItems.module.css'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const RestaurantItems = ({ restaurants }) => {
    const main = {
        '& .MuiPaginationItem-root': {
            color: "#fff"
        }
    }


    return (
        <div className='flex flex-col items-center'>
            <div className={styles.restaurants}>
                {restaurants.map((restaurant, index) => (
                    <div style={{ width: '252px', height: '120px' }}>
                        <RestaurantCard restaurant={restaurant} key={index} />
                    </div>
                ))}

            </div>
            <Stack spacing={2} sx={{ marginTop: '70px' }}>
                <Pagination count={10} color="secondary" sx={main} size="large" style={{ color: 'white' }} />
            </Stack>
        </div>
    )
}

export default RestaurantItems