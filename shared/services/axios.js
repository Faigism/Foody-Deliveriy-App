import axios from 'axios'
import { toast } from 'react-toastify'

const BASE_URL = '/api'
// const BASE_URL = 'https://foody-api.vercel.app/api'

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

//Restaurants
export const getRestaurants = async () => {
  try {
    const response = await instanceAxios.get('/restuarants')
    return response
  } catch (error) {
    console.log(error)
  }
}

export const getRestaurantById = async (id) => {
  try {
    const response = await instanceAxios.get(`restuarants/${id}`)
    const restaurant = response.data.result.data
    return restaurant
  } catch (error) {
    console.log(error)
  }
}

export const deleteRestaurantById = async (id) => {
  try {
    const response = await instanceAxios.delete(`/restuarants/${id}`)
    return response
  } catch (error) {
    console.log(error)
  }
}

export const postRestaurants = async (form) => {
  try {
    const response = await instanceAxios.post('/restuarants', form)
    return response
  } catch (err) {
    console.log(err)
  }
}

export async function getEditRestaurants(id) {
  try {
    const response = await instanceAxios.get(`/restuarants/${id}`)
    return response
  } catch (err) {
    console.log(err)
  }
}

export async function updateRestaurants(id, form) {
  try {
    const response = await instanceAxios.put(`/restuarants/${id}`, form)
    return response
  } catch (err) {
    console.log(err)
  }
}

//Categories
export const getCategoriesFromDB = async () => {
  try {
    const response = await instanceAxios.get('/category')
    const categories = response?.data.result.data
    // const uniqueCategories = categories.map(item => item.name).filter((value, index, self) =>
    //   self.indexOf(value) === index);
    // console.log(uniqueCategories)
    return categories
  } catch (err) {
    console.log(err)
  }
}

export const postCategory = async (form) => {
  try {
    const response = await instanceAxios.post('/category', form)
    return response
  } catch (err) {
    console.log(err)
  }
}

export const getCategoryById = async (id) => {
  try {
    const response = await instanceAxios.get(`/category/${id}`)
    return response
  } catch (err) {
    console.log(err)
  }
}

export const updateCategories = async (id, form) => {
  try {
    const response = await instanceAxios.put(`/category/${id}`, form)
    return response
  } catch (err) {
    console.log(err)
  }
}

export const getEditCategories = async (id) => {
  try {
    const response = await instanceAxios.get(`/category/${id}`)
    return response
  } catch (err) {
    console.log(err)
  }
}

export const deleteCategories = async (id) => {
  try {
    const response = await instanceAxios.delete(`/category/${id}`)
    return response
  } catch (err) {
    console.log(err)
  }
}
//Categories

export const getOffer = async () => {
  try {
    const response = await instanceAxios.get(`/offer`)
    return response
  } catch (err) {
    console.log(err)
  }
}

export const getEditOffer = async (id) => {
  try {
    const response = await instanceAxios.get(`/offer/${id}`)
    return response
  } catch (error) {
    console.log(error)
  }
}

export const clientRegister = async (form) => {
  try {
    const response = await instanceAxios.post('/auth/signup', form)
    return response
  } catch (error) {
    console.log(error)
  }
}

export const clientLogin = async (form) => {
  try {
    const response = await instanceAxios.post('/auth/signin', form)
    return response
  } catch (error) {
    console.log(error)
  }
}
// user-profile
export const getProfileInfo = async () => {
  try {
    let item = localStorage.getItem('userInfo')
    let userInfo = JSON.parse(item)
    const response = await instanceAxios.get(`/auth/user/`, {
      headers: {
        Authorization: `Bearer ${userInfo.access_token}`,
      },
    })
    return response
  } catch (error) {
    console.log(error)
  }
}

export const editProfileInfo = async (data) => {
  try {
    let item = localStorage.getItem('userInfo')
    let userInfo = JSON.parse(item)
    const response = await instanceAxios.put(`/auth/user/`, data, {
      headers: {
        Authorization: `Bearer ${userInfo.access_token}`,
      },
    })
    return response
  } catch (error) {
    console.log(error)
  }
}
// user-basket
export async function getProductForBasket() {
  try {
    let item = localStorage.getItem('userInfo')
    let access_token = JSON.parse(item)
    const response = await instanceAxios.get(`/basket/`, {
      headers: {
        Authorization: `Bearer ${access_token.access_token}`,
      },
    })
    return response
  } catch (err) {
    console.log(err)
  }
}

export async function postProductToBasket(id) {
  try {
    let item = localStorage.getItem('userInfo')
    let accessToken = JSON.parse(item)
    const token = accessToken.access_token
    const response = await instanceAxios.post(
      `/basket/add`,
      {
        product_id: id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return response
  } catch (err) {
    console.log(err)
  }
}

export async function clearBasket(id) {
  try {
    let item = localStorage.getItem('userInfo')
    let accessToken = JSON.parse(item)
    const token = accessToken.access_token

    const response = await instanceAxios.delete(`/basket/clear`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        basket_id: id,
      },
    })

    return response
  } catch (err) {
    console.log(err)
  }
}

export async function deleteItemFromBasket(id) {
  try {
    let item = localStorage.getItem('userInfo')
    let accessToken = JSON.parse(item)
    const token = accessToken.access_token
    const response = await instanceAxios.delete(`/basket/delete`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        product_id: id,
      },
    })

    return response
  } catch (err) {
    console.log(err)
  }
}

//order
export async function postOrder(data) {
  try {
    let item = localStorage.getItem('userInfo')
    let access_token = JSON.parse(item)
    const response = await instanceAxios.post(`/order/`, data, {
      headers: {
        Authorization: `Bearer ${access_token.access_token}`,
      },
    })

    return response
  } catch (err) {
    toast.error('Your order was not found')
    console.log(err)
  }
}

export async function getOrders() {
  try {
    let item = localStorage.getItem('userInfo')
    let access_token = JSON.parse(item)
    const response = await instanceAxios.get(`/order/user`, {
      headers: {
        Authorization: `Bearer ${access_token.access_token}`,
      },
    })
    return response
  } catch (error) {
    console.log(error)
  }
}

export async function getOrderList() {
  try {
    let item = localStorage.getItem('userInfo')
    let access_token = JSON.parse(item)
    const response = await instanceAxios.get(`/order`, {
      headers: {
        Authorization: `Bearer ${access_token.access_token}`,
      },
    })
    return response
  } catch (error) {
    console.log(error)
  }
}

export const deleteOrder = async (id) => {
  try {
    let item = localStorage.getItem('userInfo')
    let access_token = JSON.parse(item)

    const response = await instanceAxios.delete(`/order`, {
      data: {
        order_id: id,
      },
      headers: {
        Authorization: `Bearer ${access_token.access_token}`,
      },
    })
    return response
  } catch (error) {
    console.log(error)
  }
}

//order-history
export const getHistory = async () => {
  try {
    let item = localStorage.getItem('userInfo')
    let access_token = JSON.parse(item)

    const response = await instanceAxios.get('/order/history', {
      headers: {
        Authorization: `Bearer ${access_token.access_token}`,
      },
    })
    return response
  } catch (error) {
    console.log(error)
  }
}

// admin products
// export async function deleteProductById(id) {
//   try {
//     let item = localStorage.getItem('userInfo')
//     let accessToken = JSON.parse(item)
//     const token = accessToken.access_token
//     const response = await instanceAxios.delete(`/products/${id}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })

//     return response
//   } catch (err) {
//     console.log(err)
//   }
// }

export async function deleteProductById(id) {
  try {
    const response = await instanceAxios.delete(`/products/${id}`, {
    })
    return response
  } catch (err) {
    console.log(err)
  }
}
