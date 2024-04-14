import React, { useState } from 'react';

const AddRestaurants = () => {
  const [restaurantName, setRestaurantName] = useState({ name: '', address: '', restImg: '' });
  const [dishes, setDishes] = useState([]);
  const [addBtn, setAddBtn] = useState(false);
  const [updateId, setUpdateId] = useState(null); // State to track the dish being updated

  const restaurantNameHandler = () => {
    const name = document.getElementById('restaurantNameInput').value;
    const address = document.getElementById('address').value;
    const restImg = document.getElementById('restImg').value;
    setRestaurantName({ name, address, restImg });
  };

  const dishBtnHandler = () => {
    setAddBtn(!addBtn);
  };

  const addDishHandler = () => {
    const name = document.getElementById('dishName').value;
    const category = document.getElementById('category').value.split(',').filter(cat => cat.trim() !== ''); // Remove empty categories
    const description = document.getElementById('description').value;
    const outlet = document.getElementById('outlet').value.split(',').filter(out => out.trim() !== ''); // Remove empty outlets
    const price = document.getElementById('price').value;
    const imgUrl = document.getElementById('imgUrl').value;

    // Validate that all required fields are filled
    if (name && category.length > 0 && description && outlet.length > 0 && price && imgUrl) {
      const newDish = { id: dishes.length + 1, name, category, description, outlet, price, imgUrl };
      setDishes([...dishes, newDish]);
      setAddBtn(false); // Reset addBtn state after adding dish
    } else {
      alert('Please fill in all required fields.');
    }
  };

  const updateDishHandler = (id) => {
    setUpdateId(id); // Set the updateId to the id of the dish being updated
  };

  const saveUpdatedDishHandler = () => {
    const updatedDishes = dishes.map(dish => {
      if (dish.id === updateId) {
        return {
          ...dish,
          name: document.getElementById(`dishName-${updateId}`).value,
          category: document.getElementById(`category-${updateId}`).value.split(',').filter(cat => cat.trim() !== ''),
          description: document.getElementById(`description-${updateId}`).value,
          outlet: document.getElementById(`outlet-${updateId}`).value.split(',').filter(out => out.trim() !== ''),
          price: document.getElementById(`price-${updateId}`).value,
          imgUrl: document.getElementById(`imgUrl-${updateId}`).value
        };
      }
      return dish;
    });
    setDishes(updatedDishes);
    setUpdateId(null); // Reset updateId after updating the dish
  };

  const removeDishHandler = (id) => {
    setDishes(dishes.filter(dish => dish.id !== id));
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', width: "70%", minHeight: "80vh", border: "1px solid black", margin: "auto", padding: "1.5rem" }}>
      <h1 style={{ textAlign: "center" }}>Add Restaurant</h1>

      {!restaurantName.name && (
        <div>
          <input
            type="text"
            id="restaurantNameInput"
            placeholder="Restaurant Name"
            required
            style={{ marginBottom: '10px', padding: '5px', width: '100%', boxSizing: 'border-box' }}
          />
          <input
            type="text"
            id="address"
            placeholder="Address"
            required
            style={{ marginBottom: '10px', padding: '5px', width: '100%', boxSizing: 'border-box' }}
          />
          <input
            type="text"
            id="restImg"
            placeholder="Restaurant Image"
            required
            style={{ marginBottom: '10px', padding: '5px', width: '100%', boxSizing: 'border-box' }}
          />
          <button
            onClick={restaurantNameHandler}
            style={{ padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', width: '100%', boxSizing: 'border-box' }}
          >
            Confirm
          </button>
        </div>
      )}

      {restaurantName.name && (
        <div>
          <h3>{restaurantName.name}</h3>
          <img src={restaurantName.restImg} alt="Restaurant" style={{ maxWidth: '100%', marginBottom: '20px' }} />
          <div>
            <h2>Dishes</h2>
            {dishes.map((dish) => (
              <div key={dish.id} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                {updateId === dish.id ? (
                  <div>
                    <input type="text" id={`dishName-${dish.id}`} defaultValue={dish.name} style={{ marginBottom: '5px', padding: '5px', width: '100%', boxSizing: 'border-box' }} />
                    <input type="text" id={`category-${dish.id}`} defaultValue={dish.category.join(', ')} style={{ marginBottom: '5px', padding: '5px', width: '100%', boxSizing: 'border-box' }} />
                    <input type="text" id={`description-${dish.id}`} defaultValue={dish.description} style={{ marginBottom: '5px', padding: '5px', width: '100%', boxSizing: 'border-box' }} />
                    <input type="text" id={`outlet-${dish.id}`} defaultValue={dish.outlet.join(', ')} style={{ marginBottom: '5px', padding: '5px', width: '100%', boxSizing: 'border-box' }} />
                    <input type="number" id={`price-${dish.id}`} defaultValue={dish.price} style={{ marginBottom: '5px', padding: '5px', width: '100%', boxSizing: 'border-box' }} />
                    <input type="text" id={`imgUrl-${dish.id}`} defaultValue={dish.imgUrl} style={{ marginBottom: '5px', padding: '5px', width: '100%', boxSizing: 'border-box' }} />
                    <button onClick={() => saveUpdatedDishHandler(dish.id)} style={{ padding: '5px 10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Save</button>
                  </div>
                ) : (
                  <div>
                    <h3>{dish.name}</h3>
                    <p>Category: {dish.category.join(', ')}</p>
                    <p>Description: {dish.description}</p>
                    <p>Outlet: {dish.outlet.join(', ')}</p>
                    <p>Price: {dish.price}</p>
                    <p>Image URL: {dish.imgUrl}</p>
                    <button onClick={() => updateDishHandler(dish.id)} style={{ marginRight: '10px', padding: '5px 10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Update</button>
                    <button onClick={() => removeDishHandler(dish.id)} style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Remove</button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {!updateId && (
            <div>
              <button
                onClick={dishBtnHandler}
                style={{ padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', width: '100%', boxSizing: 'border-box', marginTop: '20px' }}
              >
                Add Dish
              </button>
              {addBtn && (
                <div style={{ marginTop: '20px' }}>
                  <input
                    type="text"
                    id="dishName"
                    placeholder="Dish Name"
                    required
                    style={{ marginBottom: '10px', padding: '5px', width: '100%', boxSizing: 'border-box' }}
                  />
                  <input
                    type="text"
                    id="category"
                    placeholder="Category (comma-separated)"
                    required
                    style={{ marginBottom: '10px', padding: '5px', width: '100%', boxSizing: 'border-box' }}
                  />
                  <input
                    type="text"
                    id="description"
                    placeholder="Description"
                    required
                    style={{ marginBottom: '10px', padding: '5px', width: '100%', boxSizing: 'border-box' }}
                  />
                  <input
                    type="text"
                    id="outlet"
                    placeholder="Outlet (comma-separated)"
                    required
                    style={{ marginBottom: '10px', padding: '5px', width: '100%', boxSizing: 'border-box' }}
                  />
                  <input
                    type="number"
                    id="price"
                    placeholder="Price"
                    required
                    style={{ marginBottom: '10px', padding: '5px', width: '100%', boxSizing: 'border-box' }}
                  />
                  <input
                    type="text"
                    id="imgUrl"
                    placeholder="Image URL"
                    required
                    style={{ marginBottom: '10px', padding: '5px', width: '100%', boxSizing: 'border-box' }}
                  />
                  <button
                    onClick={addDishHandler}
                    style={{ padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', width: '100%', boxSizing: 'border-box' }}
                  >
                    Confirm
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AddRestaurants;
