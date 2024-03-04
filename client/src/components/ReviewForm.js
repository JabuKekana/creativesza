import React, { useState } from "react";
import '../styles/review-form.css';

const ReviewForm = ({ onAddReview }) => {
  const [reviewData, setReviewData] = useState({
    review_user: "",
    review_email: "",
    review_text: "",
    rating: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewData((prevReview) => ({
      ...prevReview,
      [name]: value,
    }));
  };

  const handleSubmitReview = () => {

    onAddReview(reviewData);

    setReviewData({
      review_user: "",
      review_email: "",
      review_text: "",
      rating: 0,
    });
  };

  return (
    <div className="review-form-section">
      <h3>Add New Review</h3>
      <div className="review-form">
        <div className="form-group">
          <label>
            User Name:
            <input
              type="text"
              id="review_user"
              name="review_user"
              value={reviewData.review_user}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <br />
        <div className="form-group">
        <label>
          User Email:
          <input
            type="text"
            id="review_user"
            name="review_email"
            value={reviewData.review_email}
            onChange={handleInputChange}
            required
          />
        </label>
        </div>
        <br />
        <div className="form-group">
        <label>
          Rating:
          <select
            id="rating"
            name="rating"
            value={reviewData.rating}
            onChange={handleInputChange}
            required
          >
            <option value="0" disabled>
              Select a rating
            </option>
            <option value="1">1 - Poor</option>
            <option value="2">2 - Fair</option>
            <option value="3">3 - Average</option>
            <option value="4">4 - Good</option>
            <option value="5">5 - Excellent</option>
          </select>
        </label>
        </div>
        <br />
        <div className="form-group">
        <label>
          Review Text:
          <textarea
            name="review_text"
            value={reviewData.review_text}
            onChange={handleInputChange}
            required
          ></textarea>
        </label>
        </div>
        <br />
        <button type="button" onClick={handleSubmitReview}>
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default ReviewForm;
