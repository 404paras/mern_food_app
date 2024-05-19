import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/Cart.css";
import { addItem, removeItem } from "../store/cartItemsSlice.js"; // Import your Redux actions
import SignIn from '../components/SignIn.js';

const Cart = () => {
  const isAuthenticated = useSelector((state)=>state.auth.isAuthenticated)
  const foodItems = useSelector((state) => state.cart.foodItems.itemDetail);
  const dispatch = useDispatch();
  const [billDetail, setBillDetail] = useState(0);
  const [signIn,setSignIn] = useState(false);

  const closeHandler = () => {
    setSignIn(false);
  };
  
const checkOutBtnHandler = ()=>{
if(!isAuthenticated){
setSignIn(true);}
else{

}

};
  useEffect(() => {
    const totalBill = foodItems.reduce(
      (total, item) => total + item.price * item.count,
      0
    );
    setBillDetail(totalBill);
  }, [foodItems]);

  const handleButton = (id, operation) => {
    const item = foodItems.find((foodItem) => foodItem.id === id);
    if (operation === "minus") {
      dispatch(removeItem({ foodItemId: id }));
    } else if (operation === "plus") {
      dispatch(
        addItem({
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
        })
      ); // Ensure you have all necessary item details here
    }
  };
  if(foodItems.length===0){
    return (
      <div className="empty-cart-container">
        <div className="empty-cart">
        <img src="https://raw.githubusercontent.com/404paras/food_app_img_repo/main/2xempty_cart_yfxml0.avif" alt="" />
        <p className="empty-cart-msg">Your cart is empty
</p>
<p>You can go to home page to view more restaurants</p>
      </div>
      </div>
    )
  }

  return (
    <div className="cart-contain">
     
      <div className="cart-container">
      <button className="cart-add-address">Add Address</button>
        <ul className="cart-items">
          {foodItems?.map((item) => (
            <li className="cart-item" key={item.id}>
              <img
                src={item.image}
                alt={item.name}
                className="cart-item-image"
              />

              <div className="cart-item-details">
                <p className="cart-item-name">{item.name}</p>
                <p className="cart-item-price">₹{item.price * item.count}</p>
                <p className="cart-item-count">
                  <button
                    onClick={() => handleButton(item.id, "minus")}
                    className="cart-minus"
                  >
                    -
                  </button>
                  <span>{item.count}</span>
                  <button
                    onClick={() => handleButton(item.id, "plus")}
                    className="cart-plus"
                  >
                    +
                  </button>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="cart-checkout">
        <p className="bill-info">Bill Details</p>
        <div className="bill-detail">
          <div className="bill-row">
            <span>Item Total</span>
            <span>₹{billDetail.toFixed(2)}</span>
          </div>
          <div className="bill-row">
            <span>Delivery Fee</span>
            <span>₹{20}</span>
          </div>
          <div className="bill-row">
            <span>Platform Fee</span>
            <span>₹2</span>
          </div>
          <div className="bill-row">
            <span>GST</span>
            <span>₹{(billDetail*0.18).toFixed(2)}</span>
          </div>
          <div className="bill-row total">
            <span>Grand Total</span>
            <span>₹{(billDetail+2+billDetail*0.18+20).toFixed(2)}</span>
          </div>
        </div>
        <button className="cart-checkout-btn" onClick={checkOutBtnHandler}>CheckOut</button>
      </div>
      {signIn && <SignIn onClose={closeHandler} />}
    </div>
  );
};

export default Cart;
