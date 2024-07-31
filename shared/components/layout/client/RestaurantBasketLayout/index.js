import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import basketItem from '../../../../../public/basket/basketItem.svg'
import coloredBasketItem from '../../../../../public/basket/coloredBasketItem.svg'
import styles from './restaurantBasketLayout.module.css'
import { useGlobalStore } from '../../../../services/provider'

const RestaurantBasketLayout = ({ children }) => {

    const { itemCount, totalPrice } = useGlobalStore();
    console.log(itemCount)
    return (
        <div className='flex flex-col justify-between h-full'>
            <div className='flex items-end gap-2 mt-[14px] ms-[16px]'>
                <Image src={itemCount > 0 ? coloredBasketItem : basketItem} className={styles.headerImage} />
                <div className={`${styles.itemCount} ${itemCount > 0 ? styles.coloredItemCount : styles.unColoredItemCount}`}>{itemCount} items</div>
            </div>
            <div className={styles.main}> {children}</div>
            <div className='flex justify-center mb-[33px]'>
                <div className={`${styles.basketFooter} ${itemCount > 0 ? styles.coloredBasketFooter : styles.unColoredBasketFooter}`}>
                    <div>Checkout</div>
                    <div className={`${styles.checkout} ${itemCount > 0 ? styles.coloredCheckout : styles.unColoredCheckout}`}>${totalPrice}</div>
                </div>
            </div>
        </div>
    )
}

export default RestaurantBasketLayout