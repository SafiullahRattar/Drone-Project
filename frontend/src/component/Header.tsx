import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import "../sass/Header.scss";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="header">
      <div className="header__logo">LOGO</div>
      <nav className={`header__nav ${isMenuOpen ? "header__nav--open" : ""}`}>
        <a href="#" className="header__nav-link">
          Home
        </a>
        <a href="#" className="header__nav-link">
          Track
        </a>
        <a href="#" className="header__nav-link">
          Pricing
        </a>
        <a href="#" className="header__nav-link">
          Deliveries
        </a>
        <div className="header__signin-btn">Sign In</div>
      </nav>
      <div className="header__menu-button" onClick={toggleMenu}>
        {isMenuOpen ? (
          <FontAwesomeIcon icon={faBars} />
        ) : (
          <FontAwesomeIcon icon={faBars} />
        )}
        {/* <i className={`fas fa-bars ${isMenuOpen ? "fa-times" : ""}`}></i> */}
      </div>
    </header>
  );
};

export default Header;
