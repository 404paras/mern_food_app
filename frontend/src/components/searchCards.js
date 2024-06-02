import React from "react";
import "../styles/searchCard.css";
import { useDispatch } from "react-redux";
import { addItem } from "../store/cartItemsSlice";

const SearchCards = ({ image, name, id, price, category, desc, width }) => {
  const dispatch = useDispatch();

  const addToCart = ({ id, name, price, image }) => {
    if (id) {
      dispatch(addItem({ id: id, name: name, price: price, image: image }));
    }
  };

  return (
    <div className="searchCard">
      <div className="leftSearch">
        <div
          style={{ fontWeight: "800", fontSize: "0.9rem", width: { width } }}
        >
          {name || " "}
        </div>
        <div style={{ fontWeight: "600", fontSize: "0.9rem" }}>
          {" "}
          {price ? "₹" + price : " "}
        </div>
        <div style={{ fontSize: "0.7rem", color: "gray" }}>
          {category?.join(" ") || " "}
        </div>
        <div
          style={{
            fontSize: "0.6rem",
            lineHeight: "13px",
            wordSpacing: "8px",
            width: "80%",
            color: "gray",
          }}
        >
          {desc || " "}
        </div>
      </div>
      <div className="rightSearch">
        {image && (
          <>
            <img src={image} alt={name} />
            <button
              className="add"
              onClick={() =>
                addToCart({ id: id, name: name, price: price, image: image })
              }
            >
              Add
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchCards;
