import React from "react";
import { Link } from "react-router-dom";
import "../styles/header.css";

export const Header = () => {
  return (
    <div className="header-section">
      <div className="header-text">
        <h1>The Home Of Creativity</h1>
        <p>Where creatives meet the fashion adventurer</p>
        <Link to="/sign-up"><button>Sign up</button></Link>
      </div>
    </div>
  );
};
