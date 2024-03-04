import React from "react";
import { Helmet } from 'react-helmet-async';
import "../styles/creatives-hub-products.css";

const CreativesHubProducts = () => {
  return (
    <div className="creatives-hub-products-section">
      <Helmet>
        <title>Creatives SA - Hub</title>
      </Helmet>
      <h2>Current Products</h2>
    </div>
  );
};

export default CreativesHubProducts;
