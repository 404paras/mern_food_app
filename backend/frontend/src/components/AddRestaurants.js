import React, { useState } from "react";
import { server } from "../server.js";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddRestaurants = () => {
  const [restaurantName, setRestaurantName] = useState({
    name: "",
    address: "",
    imgUrl: "",
  });
  const [dishes, setDishes] = useState([]);
  const [addBtn, setAddBtn] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [dishBtn, setDishBtn] = useState(false);

  const restaurantNameHandler = () => {
    const name = document.getElementById("restaurantNameInput").value;
    const address = document.getElementById("address").value;
    const restImg = document.getElementById("restImg").value;
    const category = document.getElementById("category").value;
    if (!name || !address || !restImg || !category) {
      alert("Please enter all fields");
    } else {
      setRestaurantName({ name, address, restImg ,category});
      setAddBtn(true);
    }
  };

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
      console.log(restaurantName,dishes)
      const {
        data: { restaurantId },
      } = await axios.post(`${server}api/v1/admin/addRestaurant`, {
        name: restaurantName.name,
        address: restaurantName.address,
        imgUrl: restaurantName.restImg,
      });

      console.log(restaurantName.category)

      const response = await axios.post(`${server}api/v1/admin/category`,{
        type: 'Biryani',
        restaurants: [restaurantId]
      })

      console.log(response);

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
          restId: restaurantId,
          quantity: fooditem.quantity,
        });

        foodId.push(foodItemId.toString());
      }

      const { data } = await axios.post(`${server}api/v1/admin/restaurant`, {
        restId: restaurantId,
        foodItems: foodId,
      });

      toast(data.message);
      setRestaurantName({ name: "", address: "", imgUrl: "" });
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
      <h1 style={{ textAlign: "center" }}>Add Restaurant</h1>

      {!restaurantName.name ? (
        <div style={{width:"80%" , margin:"auto"}}>
          <input
            type="text"
            id="restaurantNameInput"
            placeholder="Restaurant Name"
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
            id="address"
            placeholder="Address"
            required
            style={{outline: "none",
            margin:"0.5rem 0 1rem 0",
            padding: "0.5rem",
            width: "100%",
            boxSizing: "border-box",
            }}
          />
          <input
            type="text"
            id="restImg"
            placeholder="Restaurant Image"
            required
            style={{outline: "none",
            margin:"0.5rem 0 1rem 0",
            padding: "0.5rem",
            width: "100%",
            boxSizing: "border-box",
            }}
          />

          <input type="text" name="category" id="category" placeholder="Category" required
            style={{outline: "none",
            margin:"0.5rem 0 1rem 0",
            padding: "0.5rem",
            width: "100%",
            boxSizing: "border-box",
            }}/>
          <button
            onClick={restaurantNameHandler}
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
        </div>
      ) : (
        <div style={{display:"flex",flexDirection:"column" , justifyContent:"center" , alignItems:"center" , padding:"1rem",
        margin:"0.5rem 0 1rem 0"}}>
          <h3 style={{margin:"0.5rem"}}>{restaurantName.name}</h3>
          <img
            src={restaurantName.restImg}
            alt="Restaurant"
            style={{ width:"30vh",height:"25vh", marginBottom: "20px" }}
          />
        </div>
      )}
      {restaurantName.name && dishes.length > 0 && (
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
      {restaurantName.name && dishes.length > 0 && addBtn && (
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

export default AddRestaurants;
