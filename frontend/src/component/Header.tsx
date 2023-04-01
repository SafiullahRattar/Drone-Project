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
  console.log(user);

  const signOutHandler = () => {
    dispatch(signOutAction());
    navigate("/");
  };
  // console.log("Navbar");
  // console.log(user);
  return (
    <header className="header">
      <div className="nav-area">
        <Link to="/" className="logo">
          DDS
        </Link>
        <nav
          className={`${"nav-area"} 
          `}
        >
          <ul className="menus">
            <li className="menu-items">
              <Link to="/tracking">Tracking</Link>
            </li>
            <li className="menu-items">
              <Link to="/profile">Service</Link>
            </li>
            <li className="menu-items">
              <Link to="/delivery">Book a Drone</Link>
            </li>
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
                  <li className="menu-items">
                    <Link to="/admin/price-plan">Price Plan</Link>
                  </li>
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
