import React from "react";
import CTAImg from "../assets/CTA-img.png";
import "../styles/cta.css";

export const CTA = () => {
  return (
    <div className="CTA-section" id="home">
      <div className="CTA-content">
        <h1>
          Do you own a brand? Let us show your brand to the world.
        </h1>
        <p>
          Together, let's celebrate the spirit of creativity and uplift our
          youth. Discover the hidden gems, embrace the innovation, and become a
          part of the Creative South Africa movement.
        </p>
        <div className="CTA-content__input">
          <input type="email" placeholder="Your Email Address" />
          <button type="button">Get Started</button>
        </div>
        <div className="CTA-content"></div>
      </div>
      <div className="CTA-image">
        <img src={CTAImg} alt="CTAImage" />
      </div>
    </div>
  );
};
