import React from 'react'
import styles from './clientRestaurantCard.module.css'
import image from './image.svg'
import Image from 'next/image'

const RestaurantCard = () => {
    return (
        <div className={styles.card}>
            <Image src={image} width={174} height={161} />
            <div className='mx-4'>
                <div>
                    <p className={styles.heading}>Coffee Mania</p>
                    <p className={styles.text}>chinese, sea-food, thai, lebanese, caribbean</p>
                </div>
                <div className='flex justify-between my-5'>
                    <span className={styles.price}>$5 Delivery</span>
                    <span className={styles.time}>09 min</span>
                </div>
            </div>
        </div>
    )
}

export default RestaurantCard