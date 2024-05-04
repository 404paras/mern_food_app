import React, { useState } from "react";
import { server } from "../server.js";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddFoodItem = () => {

  const [dishes, setDishes] = useState([]);
  const [addBtn, setAddBtn] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [dishBtn, setDishBtn] = useState(false);

  

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
    const category = document
      .getElementById("category")
      .value.split(",")
      .filter((cat) => cat.trim() !== "");
    const description = document.getElementById("description").value;
    const outlet = document
      .getElementById("outlet")
      .value.split(",")
      .filter((out) => out.trim() !== "");
    const price = document.getElementById("price").value;
    const imgUrl = document.getElementById("imgUrl").value;
    const quantity = document.getElementById("quantity").value;

    if (
      name &&
      category.length > 0 &&
      description &&
      outlet.length > 0 &&
      price &&
      imgUrl &&
      quantity
    ) {
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
          category: document
            .getElementById(`category-${updateId}`)
            .value.split(",")
            .filter((cat) => cat.trim() !== ""),
          description: document.getElementById(`description-${updateId}`).value,
          outlet: document
            .getElementById(`outlet-${updateId}`)
            .value.split(",")
            .filter((out) => out.trim() !== ""),
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
        const {
          data: { foodItemId },
        } = await axios.post(`${server}api/v1/admin/addFoodItems`, {
          name: fooditem.name,
          description: fooditem.description,
          outlet: fooditem.outlet,
          category: fooditem.category,
          price: fooditem.price,
          image: fooditem.imgUrl,
          
          quantity: fooditem.quantity,
        });

        foodId.push(foodItemId.toString());
      }

     

      toast.success();
      setDishes([]);
      setAddBtn(false);
      setDishBtn(false);
    } catch (error) {
      console.error("Error adding restaurant and food items:", error);
      toast(error?.response?.message || "Something Unexpected Occurred");
    }
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        width: "60%",
        minHeight: "80vh",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        margin: "auto",
        padding: "1.5rem",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Add Food Item</h1>

      
      { dishes.length > 0 && (
        <div style={{width:"80%", margin:"auto"}}>
          <h2>Dishes</h2>
          {dishes.map((dish) => (
            <div
              key={dish.id}
              style={{
                marginBottom: "20px",
                borderBottom: "1px solid #ccc",
                paddingBottom: "10px",
              }}
            >
              {updateId === dish.id ? (
                <div>
                  <input
                    type="text"
                    id={`dishName-${dish.id}`}
                    defaultValue={dish.name}
                    style={{outline: "none",
                    margin:"0.5rem 0 1rem 0",
                    padding: "0.5rem",
                    width: "100%",
                    boxSizing: "border-box",
                    }}
                  />
                  <input
                    type="text"
                    id={`category-${dish.id}`}
                    defaultValue={dish.category.join(", ")}
                    style={{outline: "none",
                    margin:"0.5rem 0 1rem 0",
                    padding: "0.5rem",
                    width: "100%",
                    boxSizing: "border-box",
                    }}
                  />
                  <input
                    type="text"
                    id={`description-${dish.id}`}
                    defaultValue={dish.description}
                    style={{outline: "none",
                    margin:"0.5rem 0 1rem 0",
                    padding: "0.5rem",
                    width: "100%",
                    boxSizing: "border-box",
                    }}
                  />
                  <input
                    type="text"
                    id={`outlet-${dish.id}`}
                    defaultValue={dish.outlet.join(", ")}
                    style={{outline: "none",
                    margin:"0.5rem 0 1rem 0",
                    padding: "0.5rem",
                    width: "100%",
                    boxSizing: "border-box",
                    }}
                  />
                  <input
                    type="number"
                    id={`price-${dish.id}`}
                    defaultValue={dish.price}
                    style={{outline: "none",
                    margin:"0.5rem 0 1rem 0",
                    padding: "0.5rem",
                    width: "100%",
                    boxSizing: "border-box",
                    }}
                  />
                  <input
                    type="number"
                    id={`quantity-${dish.id}`}
                    defaultValue={dish.quantity}
                    style={{
                      outline: "none",
                      margin:"0.5rem 0 1rem 0",
                      padding: "0.5rem",
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                  />
                  <input
                    type="text"
                    id={`imgUrl-${dish.id}`}
                    defaultValue={dish.imgUrl}
                    style={{
                      outline: "none",
            margin:"0.5rem 0 1rem 0",
            padding: "0.5rem",
            width: "100%",
            boxSizing: "border-box",
                    }}
                  />
                  <button
                    onClick={() => saveUpdatedDishHandler(dish.id)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#007bff",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      margin:"auto"
                    }}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div >
                  <div style={{display:"flex", minHeight:"30vh"  , justifyContent:"space-between"}}>
                  <div style={{flex:6}}>
                  <h4 style={{margin:"0.5rem"}}>Name : {dish.name}</h4>
                  <p style={{margin:"0.5rem"}}>Category: {dish.category.join(", ")}</p>
                  <p style={{margin:"0.5rem"}}>Description: {dish.description}</p>
                  <p style={{margin:"0.5rem"}}>Outlet: {dish.outlet.join(", ")}</p>
                  <p style={{margin:"0.5rem"}}>Price: {dish.price}</p>
                  <p style={{margin:"0.5rem"}}>Quantity: {dish.quantity}</p>
                  </div>
                  <img src={dish.imgUrl} alt="this is food" style={{flex:4, height:"30vh" , width:"100%", margin:"auto"}}/></div>
                  <button
                    onClick={() => updateDishHandler(dish.id)}
                    style={{
                      marginRight: "10px",
                      padding: "5px 10px",
                      backgroundColor: "#007bff",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => removeDishHandler(dish.id)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#dc3545",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <div style={{width:"80%",margin:"auto"}}>
        {addBtn && (
          <button
            onClick={addBtnHandler}
            style={{
             
              backgroundColor: "#fc8019",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              width: "100%",
              fontSize:"1.1rem",
              padding: "0.5rem",
              boxSizing: "border-box",
              marginTop: "20px",
            }}
          >
            Add Dish
          </button>
        )}
        {dishBtn && (
          <div style={{ marginTop: "20px" }}>
            <input
              type="text"
              id="dishName"
              placeholder="Dish Name"
              required
              style={{
                outline: "none",
            margin:"0.5rem 0 1rem 0",
            padding: "0.5rem",
            width: "100%",
            boxSizing: "border-box",
              }}
            />
            <input
              type="text"
              id="category"
              placeholder="Category (comma-separated)"
              required
              style={{
                outline: "none",
                margin:"0.5rem 0 1rem 0",
                padding: "0.5rem",
                width: "100%",
                boxSizing: "border-box",
              }}
            />
            <input
              type="text"
              id="description"
              placeholder="Description"
              required
              style={{
                outline: "none",
            margin:"0.5rem 0 1rem 0",
            padding: "0.5rem",
            width: "100%",
            boxSizing: "border-box",
              }}
            />
            <input
              type="text"
              id="outlet"
              placeholder="Outlet (comma-separated)"
              required
              style={{
                outline: "none",
            margin:"0.5rem 0 1rem 0",
            padding: "0.5rem",
            width: "100%",
            boxSizing: "border-box",
              }}
            />
            <input
              type="number"
              id="price"
              placeholder="Price"
              required
              style={{
                outline: "none",
            margin:"0.5rem 0 1rem 0",
            padding: "0.5rem",
            width: "100%",
            boxSizing: "border-box",
              }}
            />
            <input
              type="number"
              id="quantity"
              placeholder="Quantity"
              required
              style={{
                outline: "none",
                margin:"0.5rem 0 1rem 0",
                padding: "0.5rem",
                width: "100%",
                boxSizing: "border-box",
              }}
            />
            <input
              type="text"
              id="imgUrl"
              placeholder="Image URL"
              required
              style={{
                outline: "none",
                margin:"0.5rem 0 1rem 0",
                padding: "0.5rem",
                width: "100%",
                boxSizing: "border-box",
              }}
            />
            <button
              onClick={addDishHandler}
              style={{
                
                backgroundColor: "#fc8019",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                width: "100%",
                fontSize:"1.1rem",
                padding: "0.5rem",
                boxSizing: "border-box",
              }}
            >
              Confirm
            </button>
            <button
              onClick={cancelAddDishHandler}
              style={{
                marginTop: "10px",
               
                backgroundColor: "#dc3545",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                width: "100%",
                fontSize:"1.1rem",
                padding: "0.5rem",
                boxSizing: "border-box",
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
      { dishes.length > 0 && addBtn && (
        <div style={{margin:"auto",width:"80%"}}>
        <button
          onClick={submitBtnHandler}
          style={{
           
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          
            boxSizing: "border-box",
            marginTop: "20px",
           
            fontWeight: "bold",
            width: "100%",
            fontSize:"1.1rem",
            padding: "0.5rem",
          }}
        >
          Submit All Details
        </button></div>
      )}
      <ToastContainer />
    </div>
  );
};

export default AddFoodItem;
