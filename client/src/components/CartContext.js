import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);

  // Load cart data from sessionStorage on component mount
  useEffect(() => {
    const storedCart = JSON.parse(sessionStorage.getItem('cart')) || [];
    setCart(storedCart);
    updateTotalQuantity(storedCart);
  }, []);

  // Function to update total quantity
  const updateTotalQuantity = (updatedCart) => {
    const newTotalQuantity = updatedCart.reduce((total, item) => total + item.quantity, 0);
    setTotalQuantity(newTotalQuantity);
  };

  // Function to update cart state and sessionStorage
  const updateCartState = (updatedCart) => {
    setCart(updatedCart);
    updateTotalQuantity(updatedCart);
    sessionStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.product_id === product.product_id);

    if (existingProduct) {
      const updatedCart = cart.map((item) =>
        item.product_id === product.product_id ? { ...item, quantity: item.quantity + 1 } : item
      );
      updateCartState(updatedCart);
    } else {
      const updatedCart = [...cart, { ...product, quantity: 1 }];
      updateCartState(updatedCart);
    }

    toast.success('Product added to cart!');
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.product_id !== productId);
    updateCartState(updatedCart);
    toast.success('Product removed from cart');
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      const updatedCart = cart.filter((item) => item.product_id !== productId);
      updateCartState(updatedCart);
      toast.success('Product removed from cart');
    } else {
      const updatedCart = cart.map((item) =>
        item.product_id === productId ? { ...item, quantity: newQuantity } : item
      );
      updateCartState(updatedCart);
    }
  };

  return (
    <CartContext.Provider value={{ cart, totalQuantity, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
