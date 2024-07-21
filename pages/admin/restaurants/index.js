"use client"

import { useEffect, useState } from 'react';
import RestaurantItems from '../../../shared/components/admin/RestaurantItems'
import Subheading from '../../../shared/components/admin/Subheading'
import AdminLayout from '../../../shared/components/layout/admin'
import { getCategoriesFromDB, getCategoryById, getRestaurants } from '../../../shared/services/axios';

const Restaurants = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [restaurants, setRestaurants] = useState([]);

  const showAllRestaurants = async () => {
    const allRestaurants = await getRestaurants();
    const restaurants = allRestaurants.data.result.data;
    setRestaurants(restaurants)

  }
  useEffect(() => {
    showAllRestaurants();
  }, [])

  const getRestaurantsByCategory = async (categoryId) => {
    const response = await getCategoryById(categoryId)
    setCategoryName(response.data.result.data.name);
    const restaurantsData = await getRestaurants();
    const restaurants = restaurantsData.data.result.data
    const filteredRestaurants = restaurants?.filter(restaurant => {
      return restaurant.category_id == categoryId
    }
    )
    setRestaurants(filteredRestaurants);
  }

  const getCategories = async () => {
    const categories = await getCategoriesFromDB();
    setCategories(categories)
  }

  return (
    <AdminLayout>
      <Subheading text={"Restaurants"} type={"Category"} add={"restaurant"} state={categories} handleClick={getCategories} handleSearchByType={getRestaurantsByCategory} />
      <main style={{ margin: '0 25px 0 50px' }}>
        <RestaurantItems restaurants={restaurants} categoryName={categoryName} />
      </main>
    </AdminLayout>
  )
}
export default Restaurants
