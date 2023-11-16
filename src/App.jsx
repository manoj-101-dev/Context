/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { createContext, useContext, useReducer } from "react";
import "./App.css";

const ProductContext = createContext();

const initialState = {
  id: 1,
  title: "iPhone 9",
  description: "An apple mobile which is nothing like apple",
  price: 549.0,
  quantity: 1,
  images: "https://i.dummyjson.com/data/products/1/4.jpg",
};

function productReducer(state, action) {
  switch (action.type) {
    case "SET_QUANTITY":
      return { ...state, quantity: action.payload };
    default:
      return state;
  }
}

function ProductProvider({ children }) {
  const [product, dispatch] = useReducer(productReducer, initialState);

  return (
    <ProductContext.Provider value={{ product, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
}

function QuantitySelect() {
  const { product, dispatch } = useContext(ProductContext);

  const quantityOptions = Array.from({ length: 10 }, (_, index) => index + 1);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    dispatch({ type: "SET_QUANTITY", payload: newQuantity });
  };

  return (
    <div>
      <div id="quantity">
        <select value={product.quantity} onChange={handleQuantityChange}>
          {quantityOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="price">
        <h3>${product.price.toFixed(2)}</h3>
      </div>
    </div>
  );
}

function PriceDetails() {
  const { product } = useContext(ProductContext);

  const subtotal = (product.price * product.quantity).toFixed(2);
  const total = subtotal;

  return (
    <div className="price-details">
      <div className="values">
        <h3>Subtotal:</h3>
        <h3>Shipping:</h3>
        <h4>Total:</h4>
      </div>
      <div className="elements">
        <h3>${subtotal}</h3>
        <h3>FREE</h3>
        <h4>${total}</h4>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="card-container">
      <ProductProvider>
        <div className="price-quantity">
          <QuantitySelect />
        </div>
        <div className="card-content">
          <ProductContext.Consumer>
            {({ product }) => (
              <div className="image-container">
                <img
                  src={product.images}
                  alt={product.title}
                  className="product-image"
                />
              </div>
            )}
          </ProductContext.Consumer>
          <ProductContext.Consumer>
            {({ product }) => (
              <div className="details">
                <h2>{product.title}</h2>
                <p>
                  <b>Description :</b> {product.description}
                </p>
              </div>
            )}
          </ProductContext.Consumer>
        </div>
        <PriceDetails />
      </ProductProvider>
    </div>
  );
}

export default App;
