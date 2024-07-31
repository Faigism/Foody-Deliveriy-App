import React from 'react'
import styles from './restaurantBasketItem.module.css'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { clearBasket } from '../../../../../../services/axios';
import { useGlobalStore } from '../../../../../../services/provider';

const RestaurantBasketItem = ({ selectedProduct }) => {

    const { basketId, addProductToBasket, deleteFromBasket, deleteAllItemsFromBasket } = useGlobalStore();

    const data = {
        "basket_id": `${basketId}`
    }

    const increaseItemCount = (product) => {
        addProductToBasket(product);
    }
    const decreaseItemCount = (product) => {
        deleteFromBasket(product);
    }

    return (
        <div className={styles.basketItem}>
            <div className='flex gap-3'>
                <div>
                    <img src={selectedProduct?.img_url} className={styles.image} />
                </div>
                <div>
                    <div className={styles.productName}>{selectedProduct?.name}</div>
                    <div className={styles.price}>{selectedProduct?.price}</div>
                </div>
            </div>
            <div className='relative'>
                <div className={styles.count}>
                    <button onClick={() => { increaseItemCount(selectedProduct) }}>+</button>
                    <div>{selectedProduct.count}</div>
                    <button onClick={() => { decreaseItemCount(selectedProduct) }}>-</button>
                </div>
                <button className='absolute top-[-15px] right-[-45px]' onClick={() => { deleteAllItemsFromBasket(data) }}>
                    <DeleteSweepIcon style={{ width: '24px' }} />
                </button>
            </div>
        </div>
    )
}

export default RestaurantBasketItem