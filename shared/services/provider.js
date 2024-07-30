import { createContext, useContext, useState } from 'react'

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
  const [totalPrice, setTotalPrice] = useState(0.00);

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
    setTotalPrice
  }

  return <Component value={values}>{children}</Component>
}

export default Provider
