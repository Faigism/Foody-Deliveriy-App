import React, { useEffect } from 'react'
import styles from './restaurantBasketItem.module.css'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'
import { useGlobalStore } from '../../../../../../services/provider'

const RestaurantBasketItem = ({ selectedProduct }) => {
  const { setTotalPrice, totalPrice } = useGlobalStore()
  // useEffect(() => { setTotalPrice(totalPrice + selectedProduct.price) }, [])
  return (
    <div className={styles.basketItem}>
      <div className="flex gap-3">
        <div>
          <img src={selectedProduct?.img_url} className={styles.image} />
        </div>
        <div>
          <div className={styles.productName}>{selectedProduct?.name}</div>
          <div className={styles.price}>{selectedProduct?.price}</div>
        </div>
      </div>
      <div className="relative">
        <div className={styles.count}>
          <button>+</button>
          <div>1</div>
          <button>-</button>
        </div>
        <button className="absolute top-[-15px] right-[-45px]">
          <DeleteSweepIcon style={{ width: '24px' }} />
        </button>
      </div>
    </div>
  )
}

export default RestaurantBasketItem
