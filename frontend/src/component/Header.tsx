import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import "../sass/Header.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { signOutAction } from "../actions/userAction";

const Header = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.userSignInReducer);

  const signOutHandler = () => {
    dispatch(signOutAction());
    navigate("/");
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  //when a link is clicked, close the menu
  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [navigate]);

  // console.log("Navbar");
  // console.log(user);
  return (
    <header className={`header ${isMenuOpen ? "show" : ""}`}>
      <div className="nav">
        <Link to="/" className="">
          <img src="./logo.png" alt="logo" className="logo" />
        </Link>
        <div
          className={`menu-btn ${isMenuOpen ? "close" : ""}`}
          onClick={toggleMenu}
        >
          <div className="btn-line"></div>
          <div className="btn-line"></div>
          <div className="btn-line"></div>
        </div>
        <nav
          className={`${"nav-area"} ${isMenuOpen ? "show" : ""} 
          `}
        >
          <ul className="menus">
            <li className="menu-items">
              <Link to="/tracking">Track</Link>
            </li>
            {/* <li className="menu-items">
              <Link to="/profile">Service</Link>
            </li> */}
            {user && user.isRegistered && (
              <li className="menu-items">
                <Link to="/delivery">Send Package</Link>
              </li>
            )}
            <li className="menu-items">
              <Link to="/profile">Profile</Link>
            </li>
            {user && user.isAdmin && (
              <li className="menu-items menu-dropdown">
                <button>
                  Admin
                  <span className="arrow"></span>
                </button>
                {/* <i className="fa fa-caret-down"></i> */}
                <ul className="dropdown">
                  <li className="menu-items">
                    <Link to="/admin/drones">Drones</Link>
                  </li>
                  <li className="menu-items">
                    <Link to="/admin/users">Users</Link>
                  </li>
                  <li className="menu-items">
                    <Link to="/admin/deliveries">Deliveries</Link>
                  </li>
                  {/* <li className="menu-items">
                    <Link to="/admin/price-plan">Price Plan</Link>
                  </li> */}
                </ul>
              </li>
            )}

            {Object.keys(user).length !== 0 ? (
              <button className="btn" onClick={signOutHandler}>
                Sign Out
              </button>
            ) : (
              <Link to="/signUp">
                <button className="btn">Register</button>
              </Link>
            )}
            {/* <Link to="/login">
              <button className="btn btn__login">Login</button>
            </Link> */}
          </ul>
        </nav>
        {/* <div className="header__content__toggle">
          {!menuOpen ? (
            <FontAwesomeIcon icon={faBars} onClick={menuToggleHandler} />
          ) : (
            <FontAwesomeIcon icon={faClose} onClick={menuToggleHandler} />
          )}
        </div> */}
      </div>
    </header>
  );
};

export default Header;
