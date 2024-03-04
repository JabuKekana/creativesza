import React from "react";
import { Link } from "react-router-dom";
import { HashLink as ScrollLink } from "react-router-hash-link";
import "../styles/footer.css";

export const Footer = () => {
  return (
    <div className="footer-section" id="footer">
      <h3 className="contact-title">Contact us</h3>
      <div className="grid">
        <div className="item a">
          Want to make your brand digital? Let's make it happen
        </div>
        <div className="item b">
          +27 12 345 6789
          <br />
          info@creativessa.co.za
          <br />
          Johannesburg
          <br />
          Gauteng, South Africa
        </div>
        <div className="item c">
          <Link to="/">FAQ's</Link>
          <br />
          <Link to="/">Terms of service</Link>
          <br />
          <Link to="/">Privacy policy</Link>
        </div>
        <div className="item d">
          <Link to="/">Home</Link>
          <br />
          <ScrollLink to="/#shops">Shops</ScrollLink>
          <br />
          <ScrollLink to="/#creativeshub">Creatives Hub</ScrollLink>
        </div>
        <div className="item e">
          <Link to="/sign-up">Become a seller</Link>
          <br />
          <Link to="/">Shop Owner</Link>
          <br />
          <Link to="/">About us</Link>
        </div>
        <div className="item g">
          Explore Creative Brands
          <br />
          ©2023 Creatives SA
        </div>
      </div>
    </div>
  );
};
