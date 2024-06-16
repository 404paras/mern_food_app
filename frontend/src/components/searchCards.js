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
        <div className={`name ${width ? `custom-width-${width}` : ""}`}>
          {name || " "}
        </div>
        <div className="price">
          {price ? "₹" + price : " "}
        </div>
        <div className="category">
          {category?.join(" ") || " "}
        </div>
        <div className="desc">
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
