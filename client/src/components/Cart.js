import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";
import { Helmet } from 'react-helmet-async';
import { Footer } from './Footer';
import "../styles/cart.css";

const Cart = () => {
  const { cart, totalQuantity, removeFromCart, updateQuantity } = useCart();
  const [productShops, setProductShops] = useState({});
  const [shops, setShops] = useState([]);
  const [error, setError] = useState(null);

  const getShops = async () => {
    try {
      const response = await fetch("http://192.168.7.141:5000/shops");
      const jsonData = await response.json();
      setShops(jsonData);
    } catch (err) {
      console.error(err.message);
      setError("Error displaying the shops. Please try again later.");
    }
  };

  useEffect(() => {
    getShops();
  }, []);

  useEffect(() => {
    const fetchShopDetails = async () => {
      const shopDetails = {};

      await Promise.all(
        cart.map(async (item) => {
          const response = await fetch(
            `http://192.168.7.141:5000/shops/${item.shop_id}`
          );
          if (response.ok) {
            const shopData = await response.json();
            shopDetails[item.product_id] = {
              shop_name: shopData.shop_name,
              shop_image: shopData.shop_image,
            };
          }
        })
      );

      setProductShops(shopDetails);
    };

    fetchShopDetails();
  }, [cart]);

  const calculateTotalPrice = (cart) => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="cart-section">
      <Helmet>
        <title>Creatives SA - Cart</title>
      </Helmet>
      <h2>Your Cart</h2>
      <p>Total Quantity: {totalQuantity}</p>
      {cart.length > 0 ? (
        cart.map((item) => (
          <div className="cart-item" key={item.product_id}>
            <img src={item.productimg_1} alt={item.product_name} />
            <div className="cart-item-details">
              <p>{item.product_name}</p>
              <p>Price: R{item.price}</p>
              <p>Quantity: {item.quantity}</p>
              {productShops[item.product_id] && (
                <p className="shop-name">
                  <Link to={`/shop/${item.shop_id}`} className="link">
                    <i className="ri-home-3-fill"></i>{" "}
                    {productShops[item.product_id].shop_name}
                    <span className="shop-image">
                      <img
                        src={productShops[item.product_id].shop_image}
                        alt={productShops[item.product_id].shop_name}
                      />
                    </span>
                  </Link>
                </p>
              )}
            </div>
            <div className="cart-item-buttons">
              <button
                onClick={() =>
                  updateQuantity(item.product_id, item.quantity - 1)
                }
              >
                -
              </button>
              <button
                onClick={() =>
                  updateQuantity(item.product_id, item.quantity + 1)
                }
              >
                +
              </button>
              <button
                onClick={() => removeFromCart(item.product_id)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}
      {cart.length > 0 && <p>Total Price: R{calculateTotalPrice(cart)}</p>}
      <button className="checkout-btn">Checkout</button>
      <Footer />
    </div>
    
  );
};

export default Cart;
