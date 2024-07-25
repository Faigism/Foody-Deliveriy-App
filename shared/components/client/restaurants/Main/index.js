import React from 'react'
import styles from "./restaurantMain.module.css"
import RestaurantCard from '../RestaurantCard'

const Main = () => {
    return (
        <div className='my-8 flex flex-1 flex-wrap justify-around gap-x-20'>
            <RestaurantCard />
            <RestaurantCard />
            <RestaurantCard />
            <RestaurantCard />
            <RestaurantCard />
            <RestaurantCard />
            <RestaurantCard />
            <RestaurantCard />
        </div>
    )
}

export default Main