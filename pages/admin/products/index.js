'use client'
import { useEffect, useState } from 'react'
import Subheading from '../../../shared/components/admin/Subheading'
import AdminLayout from '../../../shared/components/layout/admin'
import {
  getProducts,
  getRestaurantById,
  getRestaurants,
} from '../../../shared/services/axios'
import ProductsItem from '../../../shared/components/admin/ProductsItem'
import AuthCheck from '../../../shared/components/admin/authCheck'
import { useGlobalStore } from '../../../shared/services/provider'

const Products = () => {
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)
  const [restaurant, setRestaurant] = useState()
  const { products, setProducts } = useGlobalStore()
  const { refresh } = useGlobalStore()

  const getAllRestaurants = async () => {
    const allRestaurantsData = await getRestaurants()
    const allRestaurants = allRestaurantsData?.data.result.data
    setRestaurants(allRestaurants)
  }

  const getProductsByRestaurant = async (id) => {
    const restaurant = await getRestaurantById(id)
    setRestaurant(restaurant)
    const products = restaurant.products
    setProducts(products)
  }

  const getAllProducts = async () => {
    const response = await getProducts()
    setProducts(response.data.result.data)
    setLoading(false)
  }

  const renderRestaurants = async () => {
    const res = await getRestaurants()
    let item = res?.data.result.data.map((i) => i.name)
    setRestaurants(item)
    setLoading(false)
  }

  useEffect(() => {
    renderRestaurants()
  }, [])

  useEffect(() => {
    getAllProducts()
  }, [refresh])

  const filterProduct = async (e) => {
    const value = e.target.value

    try {
      const response = await getProducts()

      if (value === 'all') {
        setProducts(response?.data?.result?.data)
      } else {
        const filteredProd = response?.data.result.data.filter(
          (item) => item?.rest_id === value
        )
        setProducts(filteredProd)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <AuthCheck>
      <AdminLayout>
        <Subheading
          text={'Products'}
          type={'Restaurant'}
          state={restaurants}
          callBackValue={filterProduct}
          handleClick={getAllRestaurants}
          handleSearchByType={getProductsByRestaurant}
        />
        {!loading ? (
          <main style={{ margin: '0 25px 0 50px' }}>
            <ProductsItem products={products} setProducts={setProducts} />
          </main>
        ) : (
          <div className="h-60 flex items-center justify-center">
            <div className="loading"></div>
          </div>
        )}
      </AdminLayout>
    </AuthCheck>
  )
}
export default Products
