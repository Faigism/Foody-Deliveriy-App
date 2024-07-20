import axios from 'axios'

const BASE_URL = 'https://foody-api.vercel.app/api'

const instanceAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export const getProducts = async () => {
  try {
    const response = await instanceAxios.get('/products')
    return response
  } catch (error) {
    console.log(error)
  }
}

export const createProduct = async (data) => {
  try {
    const response = await instanceAxios.post('/products', data)
    return response
  } catch (error) {
    console.log(error)
  }
}

export const getRestaurants = async () => {
  try {
    const response = await instanceAxios.get('/restuarants')
    return response
  } catch (error) {
    console.log(error)
  }
}

export const getCategoriesFromDB = async () => {
  try {
    const response = await instanceAxios.get('/category')
    const categories = response.data.result.data;
    // const uniqueCategories = categories.map(item => item.name).filter((value, index, self) =>
    //   self.indexOf(value) === index);
    // console.log(uniqueCategories)
    return categories;
  } catch (err) {
    console.log(err)
  }
}
