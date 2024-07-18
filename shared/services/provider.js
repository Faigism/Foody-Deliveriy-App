import { createContext, useContext, useState } from 'react'

export const globalContext = createContext()

export const useGlobalStore = () => {
  const value = useContext(globalContext)
  return value
}

const Provider = ({ children }) => {
  const [products, setProducts] = useState([])

  const Component = globalContext.Provider

  const values = {
    products,
    setProducts,
  }

  return <Component value={values}>{children}</Component>
}

export default Provider
