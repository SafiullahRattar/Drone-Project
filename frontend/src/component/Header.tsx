import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import "../sass/Header.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { signOutAction } from "../actions/userAction";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.userSignInReducer);

  const signOutHandler = () => {
    dispatch(signOutAction());
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header__logo">LOGO</div>
      <nav className={`header__nav ${isMenuOpen ? "header__nav--open" : ""}`}>
        {/* <a href="#" className="header__nav-link">
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
        </a> */}
        {user !== null ? (
          <Link to={"/signUp"}>
            <div className="header__signin-btn">Sign In</div>
          </Link>
        ) : (
          <div className="header__signin-btn" onClick={signOutHandler}>
            Sign Out
          </div>
        )}
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
