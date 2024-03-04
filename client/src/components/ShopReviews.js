import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import ReviewForm from "./ReviewForm";
import StarRating from "./StarRating";
import "../styles/shop-reviews.css";

const ShopReviews = ({ onAddReview, reviews }) => {
  const [isReviewFormVisible, setReviewFormVisible] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    dotsClass: "slick-dots custom-dots",
    autoplay: true,
  autoplaySpeed: 3000,
  };

  useEffect(() => {
    // Additional logic to fetch reviews if needed
  }, []);

  const handleToggleReviewForm = () => {
    setReviewFormVisible(!isReviewFormVisible);
  };

  return (
    <div className="shop-reviews-section">
      <Slider {...settings} className="reviews-slider">
        {reviews.map((review) => (
          <div key={review.review_id} className="review-card">
            <p className="user-info">
              <i className="ri-user-star-fill"></i> {review.review_user}
            </p>
            <div className="user-info">
              <StarRating rating={review.rating} />
            </div>
            <p className="review-text">{review.review_text}</p>
            <hr className="divider" />
          </div>
        ))}
      </Slider>
      <button
        type="button"
        onClick={handleToggleReviewForm}
        className="add-review-button"
      >
        {isReviewFormVisible ? "Hide Review Form" : "Add Review"}
      </button>
      {isReviewFormVisible && <ReviewForm onAddReview={onAddReview} />}
    </div>
  );
};

export default ShopReviews;
