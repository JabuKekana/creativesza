import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../styles/featured.css";

const Featured = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/products");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // Shuffle the array using Fisher-Yates (Knuth) shuffle algorithm
        const shuffledProducts = [...data].sort(() => Math.random() - 0.5);

        setFeaturedProducts(shuffledProducts);
        setError(null);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div className="featured-section">
      {error && <p>{error} Products, We are currently working on the Issue.</p>}

      <div>
        <div className="row">
          <div className="col-md-12 text-center">
            <h3 className="animate-character">
              Discover the vibrant world of local brands created by South
              Africa's talented youth & explore the endless creativity and
              unique designs that showcase our country's rich culture and
              heritage.
            </h3>
          </div>
        </div>
      </div>

      <div className="Image-slides" id="featured">
        <Carousel autoPlay infiniteLoop showStatus={false} showThumbs={false}>
          {featuredProducts.map((product, index) => (
            <div key={index} className="slide-container">
              <img
                src={product.productimg_1}
                alt={`Product Image ${index + 1}`}
              />
              <div className="overlay">
                <h2>{product.product_name}</h2>
                <a href={`/shop/${product.shop_id}`} className="button">
                  Go to Shop
                </a>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Featured;
