import React from "react";
import { Link } from "react-router-dom";
import "../styles/creatives-hub.css";

const CreativesHub = () => {
  return (
    <div className="creatives-hub-section" id="creativeshub">
      <div className="area">
        <div className="content-container">
          
          <h1>Welcome to the Creatives Hub</h1>
          <p className="hub-description">
            Explore a world of artistic creations by talented artists.
          </p>
          <div className="hub-features">
            <div className="feature">
              <h2>Diverse Art Forms</h2>
              <p>
                Discover a variety of artistic expressions, from paintings to
                music.
              </p>
            </div>
            <div className="feature">
              <h2>Inspiration Everywhere</h2>
              <p>
                Find inspiration in the latest and most innovative artworks.
              </p>
            </div>
            <div className="feature">
              <h2>Connect with Artists</h2>
              <p>
                Engage with creators and learn more about their artistic
                journey.
              </p>
            </div>
          </div>
          <Link to="/creatives-hub-products" className="view-products-button">
            Explore Artistic Creations
          </Link>
        </div>
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  );
};

export default CreativesHub;
