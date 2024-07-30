import React, { useEffect, useRef, useState } from 'react'
import styles from './restaurantProduct.module.css'
import AddIcon from '@mui/icons-material/Add'
import { useGlobalStore } from '../../../../../services/provider';

const RestaurantProduct = ({ product, index }) => {
    const [addToBasket, setAddToBasket] = useState(false);
    const [isProductExist, setIsProductExist] = useState(false);
    const { itemCount, setItemCount, setSelectedProducts, selectedProducts, setTotalPrice, totalPrice } = useGlobalStore();
    // const isMountingRef = useRef(false);
    const [check, setCheck] = useState(false);

    useEffect(() => {
        setCheck(true);
    }, []);

    useEffect(() => {
        if (check) {
            if (addToBasket) {
                setItemCount(itemCount + 1);
            } else {
                setItemCount(itemCount - 1)
            }
        }
    }, [addToBasket]);

    const addProductToBasket = (product) => {
        // const price = parseFloat(product.price).toPrecision(2)
        // console.log(price)
        if (itemCount === 0) {
            setSelectedProducts([product])
            setTotalPrice(totalPrice + product.price)
        } else {
            // const filteredProducts = selectedProducts.filter((item) => {
            //     return item.id !== myProduct.id
            // })
            // setSelectedProducts([...filteredProducts, myProduct])

            selectedProducts.map((item, index) => {

                if (item.id == product.id) {
                    console.log(item.id)
                    console.log(product.id)
                    console.log(index)
                    selectedProducts.splice(index, 1)
                    setTotalPrice(totalPrice - product.price)
                    console.log(selectedProducts)
                    setSelectedProducts(selectedProducts);
                } else {
                    setTotalPrice(totalPrice + product.price)
                    if (!isProductExist) {
                        setSelectedProducts([...selectedProducts, product])
                    }
                    setIsProductExist(false)
                }
            })
        }
    }

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
                <button className={`${addToBasket ? styles.activeAddToBasket : styles.inActiveAddToBasket} ${styles.addToBasket}`} onClick={() => {
                    addProductToBasket(product)
                    setAddToBasket(!addToBasket)
                }}><AddIcon style={{ width: '24px' }} /></button>
            </div>
        </div>
    )
}

export default RestaurantProduct