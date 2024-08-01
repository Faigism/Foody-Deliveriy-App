import React, { useEffect, useState } from 'react'
import styles from './restaurantProduct.module.css'
import AddIcon from '@mui/icons-material/Add'
import { useGlobalStore } from '../../../../../services/provider';

const RestaurantProduct = ({ product, index }) => {
    const { getProductsInBasket, addProductToBasket } = useGlobalStore();

    useEffect(() => {
        getProductsInBasket()
    }, [])

    return (
        <div className={styles.product} key={product.id}>
            <div className='flex gap-5'>
                <div>
                    <img src={product.img_url} style={{ objectFit: 'cover' }} />
                </div>
                <div>
                    <div className={styles.productName}>{product.name}</div>
                    <div className={styles.productDescription}>{product.description}</div>
                </div>
            </div>
            <div className='flex gap-5 items-center'>
                <div className={styles.price}>From <span>${product.price}</span></div>
                <button className={`${styles.addToBasket}`} onClick={() => {
                    addProductToBasket(product)
                }}><AddIcon style={{ width: '24px' }} /></button>
            </div>
        </div>
    )
}

export default RestaurantProduct