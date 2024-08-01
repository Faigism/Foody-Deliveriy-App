import React from 'react'
import styles from './restaurantBasket.module.css'
import basket from '../../../../../../public/basket/basket.svg'
import Image from 'next/image'
import { useGlobalStore } from '../../../../../services/provider'
import RestaurantBasketLayout from '../../../../layout/client/RestaurantBasketLayout'
import RestaurantBasketItem from './RestaurantBasketItem'

const RestaurantBasket = () => {
    const { itemCount, selectedProducts } = useGlobalStore();
    return (
        <div className='h-full'>
            <RestaurantBasketLayout>
                {itemCount > 0 ?
                    selectedProducts.map((selectedProduct, index) => (
                        <RestaurantBasketItem selectedProduct={selectedProduct} />
                    ))
                    :
                    <div className='flex flex-col items-center mt-[76px]'>
                        <Image src={basket} className={styles.image} />
                        <div className={styles.emptyMessage}>
                            Opps! <div>Basket empty</div>
                        </div>
                    </div>
                }
            </RestaurantBasketLayout>
        </div>
    )
}

export default RestaurantBasket