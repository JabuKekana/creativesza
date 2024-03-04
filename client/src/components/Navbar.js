import React, { useState } from "react";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { HashLink as ScrollLink } from "react-router-hash-link";
import logoImg from "../assets/logo.png";
import "../styles/navbar.css";

export const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  
  const closeNavbar = () => {
    setToggleMenu(false);
  };

  return (
    <div className="navbar-section">
      <div className="navbar-links">
        <Link to="/" className="navbar-links_logo" onClick={closeNavbar}>
          <img src={logoImg} alt="Logo" />
        </Link>
        <div className="navbar-links_container">
          <p>
            <Link to="/">Home</Link>
          </p>
          <p>
            <ScrollLink
              smooth
              to="/#shops" duration={1000} offset={-50}
              onClick={closeNavbar}
            >
              Shops
            </ScrollLink>
          </p>
          <p>
            <ScrollLink
              smooth
              to="/#creativeshub" duration={1000} offset={-50}
              onClick={closeNavbar}
            >
              Creatives Hub
            </ScrollLink>
          </p>
          <p>
            <ScrollLink
              smooth
              to="/#blog" duration={1000} offset={-50}
              onClick={closeNavbar}
            >
              Blog
            </ScrollLink>
          </p>
          <p>
            <ScrollLink
              smooth
              to="/#footer" duration={1000} offset={-50}
              onClick={closeNavbar}
            >
              Contact
            </ScrollLink>
          </p>
        </div>
      </div>
      <div className="navbar-sign">
      <Link to="/sign-up" onClick={closeNavbar} className="button">
          Sign up
        </Link>
      </div>
      <div className="navbar-menu">
        {toggleMenu ? (
          <RiCloseLine
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <RiMenu3Line
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <div className="navbar-menu_container scale-up-center">
            <div className="navbar-menu_container-links">
              <p>
                <Link to="/" onClick={closeNavbar}>
                  Home
                </Link>
              </p>
              <p>
                <ScrollLink
                  smooth
                  to="/#shops" duration={1000} offset={-50}
                  onClick={closeNavbar}
                >
                  Shops
                </ScrollLink>
              </p>
              <p>
                <ScrollLink
                  smooth
                  to="/#creativeshub" duration={1000} offset={-50}
                  onClick={closeNavbar}
                >
                  Creatives Hub
                </ScrollLink>
              </p>
              <p>
                <ScrollLink
                  smooth
                  to="/#blog" duration={1000} offset={-50}
                  onClick={closeNavbar}
                >
                  Blog
                </ScrollLink>
              </p>
              <p>
                <ScrollLink
                  smooth
                  to="/#footer" duration={1000} offset={-50}
                  onClick={closeNavbar}
                >
                  Contact
                </ScrollLink>
              </p>
            </div>
            <div className="navbar-menu_container-links-sign">
            <Link to="/sign-up" onClick={closeNavbar} className="button">
          Sign up
        </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
