import axios from 'axios';
import { server } from '../server.js';

export const allRestaurants = async () => {
  try {
    const { data } = await axios.get(`${server}api/v1/getAllRestaurants`);
   
    return data;
  } catch (error) {
    console.error('Error fetching all restaurants:', error);
    throw error; // Re-throw the error to handle it in the calling code
  }
};

export const categoryData = async ({categoryName}) => {

  try {

    const response = await axios.get(`${server}api/v1/category/${categoryName}`);
   
    return response.data;
  } catch (error) {
    console.error(`Error fetching category data for ${categoryName}:`, error);
    throw error; // Re-throw the error to handle it in the calling code
  }
};


export const restaurantDish = async ({id})=>{
 

try {
  const {data} = await axios.get(`${server}api/v1/getAllDishOfRestaurant/${id}`);
  
  return data;

} catch (error) {
  console.error(`Error fetching FoodItems  for Restaurant ${id}:`, error);
  throw error;
  
}

}

export const restInfo = async({id})=>{
  try {
    const {data} = await axios.get(`${server}api/v1/getRestaurantInfo/${id}`)
    
    return data.restaurant    ;
    
  } catch (error) {
    console.error(`Error fetching  Restaurant ${id}:`, error);
  throw error;
  }
}

export const getAllOffers = async () => {
  try {
    const response = await axios.get(`${server}api/v1/getAllOffers`);
    
    return response.data; // Return the offers data
  } catch (error) {
    console.error('Error fetching offers:', error);
    return []; // Return an empty array in case of an error
  }
};

export const getUserOrders = async ({userId})=>{
  console.log(userId)
  try {
    const response = await axios.get(`${server}api/v1/order/user/${userId}`);
    
    return response.data;
    
  } catch (error) {
    console.error('Error fetching offers:', error);
    return []; 
  }
}