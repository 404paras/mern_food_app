import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { server } from "../server.js";
import "../styles/AddFoodItem.css";

const AddFoodItem = () => {
  const [dishes, setDishes] = useState([]);
  const [addBtn, setAddBtn] = useState(true);
  const [dishBtn, setDishBtn] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  const addBtnHandler = () => {
    setAddBtn(false);
    setDishBtn(true);
  };

  const cancelAddDishHandler = () => {
    setDishBtn(false);
    setAddBtn(true);
  };

  const addDishHandler = () => {
    const name = document.getElementById("dishName").value;
    const category = document.getElementById("category").value.split(",").map(cat => cat.trim()).filter(cat => cat);
    const description = document.getElementById("description").value;
    const outlet = document.getElementById("outlet").value.split(",").map(out => out.trim()).filter(out => out);
    const price = document.getElementById("price").value;
    const imgUrl = document.getElementById("imgUrl").value;
    const quantity = document.getElementById("quantity").value;

    if (name && category.length > 0 && description && outlet.length > 0 && price && imgUrl && quantity) {
      const newDish = {
        id: dishes.length + 1,
        name,
        category,
        description,
        outlet,
        price,
        imgUrl,
        quantity,
      };
      setDishes([...dishes, newDish]);
      setDishBtn(false);
      setAddBtn(true);
    } else {
      alert("Please fill in all required fields including quantity.");
    }
  };

  const updateDishHandler = (id) => {
    setUpdateId(id);
  };

  const saveUpdatedDishHandler = () => {
    const updatedDishes = dishes.map((dish) => {
      if (dish.id === updateId) {
        return {
          ...dish,
          name: document.getElementById(`dishName-${updateId}`).value,
          category: document.getElementById(`category-${updateId}`).value.split(",").map(cat => cat.trim()).filter(cat => cat),
          description: document.getElementById(`description-${updateId}`).value,
          outlet: document.getElementById(`outlet-${updateId}`).value.split(",").map(out => out.trim()).filter(out => out),
          price: document.getElementById(`price-${updateId}`).value,
          imgUrl: document.getElementById(`imgUrl-${updateId}`).value,
          quantity: document.getElementById(`quantity-${updateId}`).value,
        };
      }
      return dish;
    });
    setDishes(updatedDishes);
    setUpdateId(null);
  };

  const removeDishHandler = (id) => {
    setDishes(dishes.filter((dish) => dish.id !== id));
  };

  const submitBtnHandler = async () => {
    try {
      const foodId = [];
      for (const fooditem of dishes) {
        const { data } = await axios.post(`${server}api/v1/admin/addFoodItems`, {
          name: fooditem.name,
          description: fooditem.description,
          outlet: fooditem.outlet,
          category: fooditem.category,
          price: fooditem.price,
          image: fooditem.imgUrl,
          quantity: fooditem.quantity,
        });

        foodId.push(data.foodItemId.toString());
      }

      toast("Successfully added food items!");
      setDishes([]);
      setAddBtn(true);
      setDishBtn(false);
    } catch (error) {
      console.error("Error adding restaurant and food items:", error);
      toast(error?.response?.message || "Something unexpected occurred");
    }
  };

  return (
    <div className="dish-container">
      {dishes.length > 0 && (
        <div className="dishes-container">
          <h2>Dishes</h2>
          {dishes.map((dish) => (
            <div key={dish.id} className="dish">
              {updateId === dish.id ? (
                <div>
                  <input
                    type="text"
                    id={`dishName-${dish.id}`}
                    defaultValue={dish.name}
                    className="dish-input"
                  />
                  <input
                    type="text"
                    id={`category-${dish.id}`}
                    defaultValue={dish.category.join(", ")}
                    className="dish-input"
                  />
                  <input
                    type="text"
                    id={`description-${dish.id}`}
                    defaultValue={dish.description}
                    className="dish-input"
                  />
                  <input
                    type="text"
                    id={`outlet-${dish.id}`}
                    defaultValue={dish.outlet.join(", ")}
                    className="dish-input"
                  />
                  <input
                    type="number"
                    id={`price-${dish.id}`}
                    defaultValue={dish.price}
                    className="dish-input"
                  />
                  <input
                    type="number"
                    id={`quantity-${dish.id}`}
                    defaultValue={dish.quantity}
                    className="dish-input"
                  />
                  <input
                    type="text"
                    id={`imgUrl-${dish.id}`}
                    defaultValue={dish.imgUrl}
                    className="dish-input"
                  />
                  <button onClick={saveUpdatedDishHandler} className="add-food-item-button">
                    Save
                  </button>
                </div>
              ) : (
                <div>
                  <div className="dish-details">
                    <div>
                      <h4>Name : {dish.name}</h4>
                      <p>Category: {dish.category.join(", ")}</p>
                      <p>Description: {dish.description}</p>
                      <p>Outlet: {dish.outlet.join(", ")}</p>
                      <p>Price: {dish.price}</p>
                      <p>Quantity: {dish.quantity}</p>
                    </div>
                    <img src={dish.imgUrl} alt="Food" />
                  </div>
                  <button onClick={() => updateDishHandler(dish.id)} className="add-food-item-button add-food-item-button-save">
                    Update
                  </button>
                  <button onClick={() => removeDishHandler(dish.id)} className="add-food-item-button add-food-item-button-remove">
                    Remove
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <div className="dishes-container">
        {addBtn && (
          <button onClick={addBtnHandler} className="add-food-item-add-dish-btn">
            Add Dish
          </button>
        )}
        {dishBtn && (
          <div className="dish">
            <input
              type="text"
              id="dishName"
              placeholder="Dish Name"
              required
              className="dish-input"
            />
            <input
              type="text"
              id="category"
              placeholder="Category (comma-separated)"
              required
              className="dish-input"
            />
            <input
              type="text"
              id="description"
              placeholder="Description"
              required
              className="dish-input"
            />
            <input
              type="text"
              id="outlet"
              placeholder="Outlet (comma-separated)"
              required
              className="dish-input"
            />
            <input
              type="number"
              id="price"
              placeholder="Price"
              required
              className="dish-input"
            />
            <input
              type="number"
              id="quantity"
              placeholder="Quantity"
              required
              className="dish-input"
            />
            <input
              type="text"
              id="imgUrl"
              placeholder="Image URL"
              required
              className="dish-input"
            />
            <button onClick={addDishHandler} className="add-food-item-confirm-btn">
              Confirm
            </button>
            <button onClick={cancelAddDishHandler} className="add-food-item-cancel-btn">
              Cancel
            </button>
          </div>
        )}
      </div>
      {dishes.length > 0 && addBtn && (
        <div className="dishes-container">
          <button onClick={submitBtnHandler} className="add-food-item-submit-btn">
            Submit All Details
          </button>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default AddFoodItem;
