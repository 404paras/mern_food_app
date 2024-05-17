import React from 'react';
import { useSelector } from 'react-redux';
import '../styles/Cart.css'; // Import your CSS file for styling

const Cart = () => {
  const foodItems = useSelector(state => state.cart.foodItems.itemDetail);

  return (
    <div className="cart-container">
      <h1>Cart</h1>
      <ul className="cart-items">
        {foodItems.map((item, index) => (
          <li key={index} className="cart-item">
            <div className="item-details">
              <span className="item-name">{item.name}</span>
              <span className="item-count">{item.count} {item.count > 1 ? 'items' : 'item'}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
