import React, { useState, useEffect } from "react";
import ShopCard from "./ShopCard";
import "../styles/shoplist.css";

function ShopList() {
  const [shops, setShops] = useState([]);
  const [error, setError] = useState(null);

  const getShops = async () => {
    try {
      const response = await fetch("http://localhost:5000/shops");
      const jsonData = await response.json();
      setShops(jsonData);
    } catch (err) {
      console.error(err.message);
      setError("Shops are currently unavailable, We are currently working on the issue. Please try again later.");
    }
  };

  useEffect(() => {
    getShops();
  }, []);

  return (
    <div className="shop-list-section" id="shops">
      <h3 className="small-title">
      <i className="ri-store-3-fill"></i> -
        BROWSE ONLINE SHOPS       
      </h3>
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="shop-list-container">
          <div className="row">
            {shops.map((shop) => (
              <ShopCard key={shop.shop_id} shop={shop} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ShopList;




