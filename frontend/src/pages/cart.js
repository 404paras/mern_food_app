import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/Cart.css";
import { addItem, removeItem } from "../store/cartItemsSlice.js";
import SignIn from "../components/SignIn.js";
import { v4 as uuidv4 } from 'uuid';
import { getAllOffers } from "../Data/Data.js";
import { Link} from "react-router-dom";

const Cart = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const foodItems = useSelector((state) => state.cart.foodItems.itemDetail);
  const dispatch = useDispatch();
  const [orderId, setOrderId] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [appliedCouponName, setAppliedCouponName] = useState("");
  const [invalidCoupon, setInvalidCoupon] = useState(false);
  const [billDetail, setBillDetail] = useState(0);
  const [signIn, setSignIn] = useState(false);
  const [coupons, setCoupons] = useState(null);
  const [showCouponInput, setShowCouponInput] = useState(false);

  
  

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const offersData = await getAllOffers();
        setCoupons(offersData);
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    };
    if (!coupons) {
      fetchOffers();
    }
    const calculateBillDetail = () => {
      const totalBill = foodItems.reduce(
        (total, item) => total + item.price * item.count,
        0
      );
      setBillDetail(totalBill);
    };
    calculateBillDetail();
    setOrderId(uuidv4());
  }, [foodItems, coupons]);

  const handleCouponCodeSubmit = () => {
    const coupon = coupons.find((coupon) => coupon.couponcode === couponCode);
    if (coupon) {
      setCouponApplied(true);
      setAppliedCouponName(coupon.couponcode);
      setBillDetail(
        (prevBillDetail) => prevBillDetail * (1 - coupon.discount / 100)
      );
      setInvalidCoupon(false);
    } else {
      setCouponApplied(false);
      setInvalidCoupon(true);
    }
  };

  const handleButton = (id, operation) => {
    if (operation === "minus") {
      dispatch(removeItem({ foodItemId: id }));
    } else if (operation === "plus") {
      const item = foodItems.find((foodItem) => foodItem.id === id);
      dispatch(
        addItem({
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
        })
      );
    }
  };

  const checkOutBtnHandler = () => {
    if (!isAuthenticated) {
      setSignIn(true);
    } else {
      setSignIn(false);
    }
  };

  if (foodItems.length === 0) {
    return (
      <div className="empty-cart-container">
        <div className="empty-cart">
          <img
            src="https://raw.githubusercontent.com/404paras/food_app_img_repo/main/2xempty_cart_yfxml0.avif"
            alt="Empty Cart"
          />
          <p className="empty-cart-msg">Your cart is empty</p>
          <p>You can go to the home page to view more restaurants</p>
        </div>
      </div>
    );
  }

  const deliveryFee = 20;
  const platformFee = 2;
  const gst = billDetail * 0.18;
  const grandTotal = billDetail + deliveryFee + platformFee + gst;

  return (
    <div className="cart-contain">
      <div className="cart-container">
        <ul className="cart-items">
          {foodItems.map((item) => (
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
            <span>₹{deliveryFee}</span>
          </div>
          <div className="bill-row">
            <span>Platform Fee</span>
            <span>₹{platformFee}</span>
          </div>
          <div className="bill-row">
            <span>GST</span>
            <span>₹{gst.toFixed(2)}</span>
          </div>
          {!showCouponInput && !couponApplied && (
            <div className="bill-row coupon-row">
              <span
                className="coupon-link"
                onClick={() => setShowCouponInput(true)}
              >
                Have a Coupon Code?
              </span>
            </div>
          )}
          {showCouponInput && !couponApplied && (
            <div className="bill-row coupon-input">
              <input
                type="text"
                placeholder="Coupon Code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                id="coupon-input"
              />
              <button
                id="coupon-code-input-btn"
                onClick={handleCouponCodeSubmit}
              >
                Apply
              </button>
            </div>
          )}
          {invalidCoupon && (
            <div className="bill-row">
              <span className="invalid-coupon">Invalid Coupon Code</span>
            </div>
          )}
          {couponApplied && (
            <div className="bill-row coupon-applied">
              <span>Coupon Applied: {appliedCouponName}</span>
            </div>
          )}
          <div className="bill-row total">
            <span>Grand Total</span>
            <span>₹{grandTotal.toFixed(2)}</span>
          </div>
        </div>

        {!isAuthenticated ? (
          <button className="cart-checkout-btn" onClick={checkOutBtnHandler}>
            CheckOut
          </button>
        ) : (
          <Link to={`/checkout/${encodeURIComponent(orderId)}/${encodeURIComponent(grandTotal.toFixed(2))}`}>
  <button className="cart-checkout-btn">CheckOut </button>{" "}
</Link>
        )}
      </div>
      {signIn && <SignIn onClose={() => setSignIn(false)} />}
    </div>
  );
};

export default Cart;
