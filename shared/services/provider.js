import { createContext, useContext, useState } from 'react'
import { clearBasket, deleteItemFromBasket, getProductForBasket, postProduct } from './axios'

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
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [basketId, setBasketId] = useState("");
  // const [basketItems, setBasketItems] = useState([]);

  const getProductsInBasket = async () => {
    const response = await getProductForBasket();
    setBasketId(response?.data.result.data.id);
    // setBasketItems(response?.data.result.data.items)
    setItemCount(response?.data.result.data.total_count)
    setSelectedProducts(response?.data.result.data.items);
    setTotalPrice(response?.data.result.data.total_amount)
  }

  const addProductToBasket = async (product) => {
    const productId = {
      "product_id": `${product.id}`
    }
    const response = await postProduct(productId)
    getProductsInBasket();
  }

  const deleteFromBasket = async (product) => {
    const data = {
      "product_id": `${product.id}`
    }

    const response = await deleteItemFromBasket(data);
    getProductsInBasket();
  }

  const deleteAllItemsFromBasket = async (data) => {

    const response = await clearBasket(data);
    getProductsInBasket();
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
    // basketItems,
    // setBasketItems,
    addProductToBasket,
    getProductsInBasket,
    deleteFromBasket,
    deleteAllItemsFromBasket
  }

  return <Component value={values}>{children}</Component>
}

export default Provider
