import axios from 'axios'

const baseUrl = 'https://foody-api.vercel.app/api'

const instanceAxios = axios.create({
  baseURL: baseUrl,
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
