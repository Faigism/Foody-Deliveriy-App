import React, { useEffect, useState } from 'react'
import styles from './clientRestaurantCard.module.css'
import { useRouter } from 'next/router'

const RestaurantCard = ({ restaurant }) => {
    const [newRestaurant, setNewRestaurant] = useState(false);
    const router = useRouter()

    const redirect = id => {
        router.push(`/restaurants/${id}`)
    }
    const isRestaurantNew = () => {
        const date = new Date()
        const differenceInTime = date.getTime() - restaurant.created;
        const differenceInDay = Math.round(differenceInTime / (1000 * 3600 * 24));

        if (differenceInDay < 7) {
            setNewRestaurant(true)
        }
    }
    useEffect(() => {
        isRestaurantNew()
    }, [])

    return (
        <div className={styles.card} onClick={() => {
            redirect(restaurant.id)
        }}>
            {newRestaurant &&
                <div className={styles.newRestaurant}>New</div>
            }
            <img src={restaurant.img_url} />
            <div className='px-4 w-full'>
                <div className={styles.restaurantInfo}>
                    <p className={styles.heading}>{restaurant.name}</p>
                    <p className={styles.text}>{restaurant.cuisine}</p>
                </div>
                <div className='flex justify-between my-5'>
                    <span className={styles.price}>${restaurant.delivery_price} Delivery</span>
                    <span className={styles.time}>{restaurant.delivery_min}min</span>
                </div>
            </div>
        </div>
    )
}

export default RestaurantCard