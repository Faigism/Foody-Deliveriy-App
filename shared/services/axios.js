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
