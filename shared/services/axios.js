import axios from "axios";

const BASE_URL = "https://foody-api.vercel.app/";

const getCategoriesFromDB = async () => {
    try {
        const response = await axios.get(BASE_URL + "api/category");
        const categories = response.data.result.data;
        // const uniqueCategories = categories.map(item => item.name).filter((value, index, self) =>
        //   self.indexOf(value) === index);
        // console.log(uniqueCategories)
        console.log(categories)
        return categories;
    } catch (err) {
        console.log(err)
    }
}

const getRestaurantsByCategoryFromDB = async (categoryId) => {
    const response = await axios.get(BASE_URL + `api/category/${categoryId}`);
}

const getRestaurantsFromDB = async () => {
    const response = await axios.get(BASE_URL + `api/restuarants`);
    return response.data.result.data
}

export { getCategoriesFromDB, getRestaurantsByCategoryFromDB, getRestaurantsFromDB }