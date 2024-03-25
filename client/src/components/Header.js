import React from "react";
import { HashLink as ScrollLink } from "react-router-hash-link";
import "../styles/header.css";

export const Header = () => {
  return (
    <div className="header-section">
      <div className="header-text">
        <h1>The Home Of Creativity</h1>
        <p>Where creatives meet the fashion adventurer</p>
        <ScrollLink smooth to="/#shops"><button>Shops</button></ScrollLink>
        </div>
    </div>
  );
};
