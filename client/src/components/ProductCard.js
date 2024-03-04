import React, { useState } from 'react';
import ProductInfoModal from './ProductInfoModal';
import Slider from 'react-slick';
import '../styles/productlist.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ProductCard = ({ product, addToCart, cart }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);
  const maxDescriptionLength = 50;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    dotsClass: 'slick-dots custom-dots',
  };

  const handleImageChange = (index) => {
    setCurrentImageIndex(index);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="product-card">
      <Slider {...settings}>
        {[product.productimg_1, product.productimg_2, product.productimg_3].map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Product ${index + 1}`} />
          </div>
        ))}
      </Slider>
      <div className="product-details">
        <div className="product-header">
          <h2>{product.product_name}</h2>
        </div>
        <p className="description">
          {product.product_description.length > maxDescriptionLength
            ? `${product.product_description.slice(0, maxDescriptionLength)}...`
            : product.product_description}
        </p>
        <div className="product-price">
          <p>Price: R{product.price}</p>
        </div>
        <button onClick={handleAddToCart}>Add to Cart</button>
        <button onClick={openModal}>Product Info</button>
        {product.is_on_sale && <div className="sale-tag"> ITEM IS ON SALE</div>}
      </div>
      {isModalOpen && (
        <ProductInfoModal isOpen={isModalOpen} closeModal={closeModal} product={product} />
      )}
    </div>
  );
};

export default ProductCard;
