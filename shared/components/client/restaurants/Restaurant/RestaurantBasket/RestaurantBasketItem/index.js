import React from 'react'
import styles from './restaurantBasketItem.module.css'
import { useGlobalStore } from '../../../../../../services/provider'

const RestaurantBasketItem = ({ selectedProduct }) => {
  const { addProductToBasket, deleteFromBasket } = useGlobalStore()

  const increaseItemCount = (product) => {
    addProductToBasket(product)
  }
  const decreaseItemCount = (product) => {
    deleteFromBasket(product)
  }

  return (
    <div className={styles.basketItem}>
      <div className="flex gap-3">
        <div>
          <img
            src={selectedProduct?.img_url}
            className={styles.image}
            alt="ProdImg"
          />
        </div>
        <div>
          <div className={styles.productName}>{selectedProduct?.name}</div>
          <div className={styles.price}>{selectedProduct?.price}</div>
        </div>
      </div>
      <div>
        <div className={styles.count}>
          <button
            className={styles.plus}
            onClick={() => {
              increaseItemCount(selectedProduct.id)
            }}
          >
            +
          </button>
          <div>{selectedProduct.count}</div>
          <button
            className={styles.minus}
            onClick={() => {
              decreaseItemCount(selectedProduct.id)
            }}
          >
            -
          </button>
        </div>
      </div>
    </div>
  )
}

export default RestaurantBasketItem
