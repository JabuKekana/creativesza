import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Slider from "react-slick";
import StarRating from "../../components/StarRating";
import "../../styles/super-admin-shop-reviews.css";

const SuperAdminShopReviews = () => {
  const { shop_id } = useParams();
  const [reviews, setReviews] = useState([]);

  const settings = {
    dots: reviews.length > 3,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    dotsClass: "slick-dots custom-dots",
  };

  const fetchReviews = async () => {
    try {
      const response = await fetch(`http://localhost:5000/reviews/${shop_id}`);
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [shop_id]);

  const handleDeleteReview = async (review_id) => {
    try {
      const response = await fetch(`http://localhost:5000/reviews/${review_id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setReviews(reviews.filter((review) => review.review_id !== review_id));
        toast.success("Review deleted successfully!");
      } else {
        console.error(`Failed to delete review ${review_id}`);
      }
    } catch (error) {
      console.error(`Error deleting review ${review_id}`, error);
    }
  };

  return (
    <div className="shop-reviews">
      <Slider {...settings} className="reviews-slider">
        {reviews.map((review) => (
          <div key={review.review_id} className="review-card">
            <p>User: {review.review_user}</p>
            <p>Email: {review.review_email}</p>
            <div className="user-info">
              <StarRating rating={review.rating} />
            </div>
            <p>Review: {review.review_text}</p>
            <hr className="divider" />
            <button className="delete-review-button" onClick={() => handleDeleteReview(review.review_id)}>
              Delete Review
            </button>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SuperAdminShopReviews;
