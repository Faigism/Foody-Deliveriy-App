import React, { useEffect } from 'react'
import styles from './restaurantProduct.module.css'
import AddIcon from '@mui/icons-material/Add'
import { useGlobalStore } from '../../../../../services/provider'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

const RestaurantProduct = ({ product }) => {
  const { getProductsInBasket, addProductToBasket } = useGlobalStore()
  const { push } = useRouter()
  const date = new Date()

  const reLogin = () => {
    const loginDate = parseInt(localStorage.getItem('loginDate') || '', 10)
    const currentSecond = date.getTime()
    const timeDifference = currentSecond - (loginDate || 0)
    if (!localStorage.getItem('userInfo')) {
      toast.error('You need to be logged in !')
      setTimeout(() => {
        push('/login')
      }, 750)
      return
    }

    if (timeDifference / 1000 >= 3600) {
      toast.error('Your browsing session has expired!')
      setTimeout(() => {
        push('/login')
      }, 750)
      localStorage.removeItem('userInfo')
      localStorage.removeItem('tokenObj')
    } else if (timeDifference / 1000 >= 3540) {
      toast.warning(
        'You will be logged out from the site in the next 1 minutes.!',
        {
          autoClose: 1000,
        }
      )
    }
  }

  useEffect(() => {
    getProductsInBasket()
  }, [])

  return (
    <>
      <div className={styles.product} key={product.id}>
        <div className="flex gap-5">
          <div>
            <img
              src={product.img_url}
              style={{ objectFit: 'cover' }}
              alt="ProdImg"
            />
          </div>
          <div>
            <div className={styles.productName}>{product.name}</div>
            <div className={styles.productDescription}>
              {product.description}
            </div>
          </div>
        </div>
        <div className="flex gap-5 items-center">
          <div className={styles.price}>
            From <span>${product.price}</span>
          </div>
          <button
            className={`${styles.addToBasket}`}
            onClick={() => {
              addProductToBasket(product.id)
              reLogin()
            }}
          >
            <AddIcon style={{ width: '24px' }} />
          </button>
        </div>
      </div>
    </>
  )
}

export default RestaurantProduct
