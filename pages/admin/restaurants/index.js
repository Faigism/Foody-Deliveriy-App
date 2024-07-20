"use client"

import { useState } from 'react';
import RestaurantItems from '../../../shared/components/admin/RestaurantItems'
import Subheading from '../../../shared/components/admin/Subheading'
import AdminLayout from '../../../shared/components/layout/admin'
import { getCategoriesFromDB, getRestaurants, getRestaurantsFromDB } from '../../../shared/services/axios';

const Restaurants = () => {
  const [categories, setCategories] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  const getRestaurantsByCategory = async (categoryId) => {
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
        <RestaurantItems restaurants={restaurants} />
      </main>
    </AdminLayout>
  )
}
export default Restaurants
