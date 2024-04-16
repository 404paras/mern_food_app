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
  console.log(categoryName)
  try {

    const response = await axios.get(`${server}api/v1/category/${categoryName}`);
    console.log(`${server}api/v1/category/${categoryName}`)
    return response.data;
  } catch (error) {
    console.error(`Error fetching category data for ${categoryName}:`, error);
    throw error; // Re-throw the error to handle it in the calling code
  }
};
