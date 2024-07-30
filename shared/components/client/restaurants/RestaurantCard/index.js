import React from 'react'
import styles from './clientRestaurantCard.module.css'
import { useRouter } from 'next/router'

const RestaurantCard = ({ restaurant }) => {
    const router = useRouter()

    const redirect = id => {
        router.push(`/restaurants/${id}`)
    }

    return (
        <div className={styles.card} onClick={() => {
            redirect(restaurant.id)
        }}>
            <img src={restaurant.img_url} />
            <div className='px-4 w-full'>
                <div>
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