import React from "react";
import "../styles/signup-form-options.css";

const SignUpFormOptions = ({ onSelectOption }) => {
    return (
      <div className="signup-form-options">
        <div className="options-content">
          <h2>Congratulations on Taking the First Step!</h2>
          <p>
            Welcome to Creatives SA, where your creative journey begins! By choosing to sign up, you've not just joined a platform; you've become a part of a vibrant community of artists, artisans, and innovators. At Creatives SA, we believe in empowering creatives like you to bring your unique vision to life.
          </p>
          <p>
            Whether you're a seasoned creator or just starting, Creatives SA provides you with the opportunity to own a shop and showcase your one-of-a-kind products. Customize your shop, connect with customers, and watch your creative endeavors flourish. Alternatively, if you have a single product that deserves the spotlight, Creatives Hub is the perfect space to share it with our supportive community.
          </p>
          <p>
            Creatives SA is not just a platform; it's a celebration of creativity, individuality, and the endless possibilities that come with expressing yourself. Take a moment to explore the options below and choose the path that aligns with your creative aspirations.
          </p>
        </div>
        <div className="options-buttons">
          <h3>Choose an Option:</h3>
          <button type="button" onClick={() => onSelectOption("shop")}>
            Rent a Shop
          </button>
          <button type="button" onClick={() => onSelectOption("product")}>
            Sell a Product in Creatives Hub
          </button>
        </div>
      </div>
    );
  };
  
  export default SignUpFormOptions;
