import React from 'react';
import addRestaurant from '../assets/adminPage/addRestaurant.jpeg';
import AdminPageCard from '../components/AdminPageCards.js';
import addFoodItem from '../assets/adminPage/addFoodItem.jpeg';

const ManageRestaurant = () => {
  return (
    <div style={{ width: "80%", margin: "auto", paddingTop: "60px", backgroundColor: "white" }}>
      <h1 style={{ textAlign: "center" }}>Manage Restaurants</h1>
      <div style={{ flexWrap: "wrap", display: "flex", justifyContent: "space-around", alignItems: "center", width: "100%", minHeight: "80vh" }}>
        <AdminPageCard
          title="Add New Restaurant"
          description="Click here to add a new restaurant to the system."
          link="/admin/addRestaurant"
          img={addRestaurant}
        />
        <AdminPageCard
          title="Add New Food Item"
          description="Click here to add a new food item to the system."
          link="/admin/addFoodItem"
          img={addFoodItem}
        />
      </div>
    </div>
  );
}

export default ManageRestaurant;
