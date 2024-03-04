import React from "react";
import { Link } from "react-router-dom";
import "../styles/shoplist.css";

const ShopCard = ({ shop }) => {
  return (
    <div className="shop-card-section">
      <img src={shop.shop_image} alt={`Image for ${shop.shop_name}`} />
      <div className="details">
        <h2>
          <span>{shop.shop_name}</span>
        </h2>
        <p>{shop.shop_description}</p>
        <div className="more">
          <Link to={`/shop/${shop.shop_id}`} className="read-more">
            Visit <span>Shop</span> <i className="ri-arrow-right-circle-line"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShopCard;