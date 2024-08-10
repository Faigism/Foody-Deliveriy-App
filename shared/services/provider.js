import { createContext, useContext, useState } from 'react'
import {
  clearBasket,
  deleteItemFromBasket,
  getProductForBasket,
  postProductToBasket,
} from './axios'

export const globalContext = createContext()

export const useGlobalStore = () => {
  const value = useContext(globalContext)
  return value
}

const Provider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [categoryData, setCategoryData] = useState([])
  const [offerData, setOfferData] = useState([])
  const [filteredRestaurants, setFilteredRestaurants] = useState([])
  const [itemCount, setItemCount] = useState(0)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedProducts, setSelectedProducts] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [basketId, setBasketId] = useState('')
  const [refresh, setRefresh] = useState(false)
  const [basketData, setBasketData] = useState({})
  const [checkout, setCheckout] = useState(false)
  const [orderData, setOrderData] = useState([])
  const [orderForShow, setOrderForShow] = useState([])
  const [history, setHistory] = useState([])

  const getProductsInBasket = async () => {
    const response = await getProductForBasket()
    setBasketId(response?.data.result.data.id)
    setItemCount(response?.data.result.data.total_count)
    setSelectedProducts(response?.data.result.data.items)
    setTotalPrice(response?.data.result.data.total_amount)
  }

  const addProductToBasket = async (product) => {
    const response = await postProductToBasket(product)
    getProductsInBasket()
  }

  const deleteFromBasket = async (product) => {
    const response = await deleteItemFromBasket(product)
    getProductsInBasket()
  }

  const deleteAllItemsFromBasket = async (data) => {
    const response = await clearBasket(data)
    getProductsInBasket()
  }

  const Component = globalContext.Provider

  const values = {
    products,
    setProducts,
    categoryData,
    setCategoryData,
    offerData,
    setOfferData,
    filteredRestaurants,
    setFilteredRestaurants,
    itemCount,
    setItemCount,
    selectedProduct,
    setSelectedProduct,
    selectedProducts,
    setSelectedProducts,
    totalPrice,
    setTotalPrice,
    basketId,
    setBasketId,
    refresh,
    setRefresh,
    setBasketData,
    basketData,
    setCheckout,
    checkout,
    setOrderData,
    orderData,
    setOrderForShow,
    orderForShow,
    setHistory,
    history,
    addProductToBasket,
    getProductsInBasket,
    deleteFromBasket,
    deleteAllItemsFromBasket,
  }

  return <Component value={values}>{children}</Component>
}

export default Provider
