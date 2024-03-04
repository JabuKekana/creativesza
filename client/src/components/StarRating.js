import React from 'react';

const StarRating = ({ rating }) => {
  const MAX_STARS = 5;

  const getStarType = (index) => {
    const roundedRating = Math.round(rating * 2) / 2; 
    if (index + 0.5 === roundedRating) {
      return 'ri-star-half-line';
    } else if (index + 1 <= roundedRating) {
      return 'ri-star-fill';
    } else {
      return 'ri-star-line';
    }
  };

  return (
    <div className="star-rating">
      {Array.from({ length: MAX_STARS }).map((_, index) => (
        <i key={index} className={getStarType(index)}></i>
      ))}
    </div>
  );
};

export default StarRating;
