import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import "../sass/Header.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { signOutAction } from "../actions/userAction";

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });
  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (size.width > 768 && menuOpen) {
      setMenuOpen(false);
    }
  }, [size.width, menuOpen]);

  const menuToggleHandler = () => {
    setMenuOpen((p) => !p);
  };

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.userSignInReducer);

  const signOutHandler = () => {
    dispatch(signOutAction());
    navigate("/");
  };
  // console.log("Navbar");
  // console.log(user);
  return (
    <header className="header">
      <div className="header__content">
        <Link to="/" className="header__content__logo">
          Navbar
        </Link>
        <nav
          className={`${"header__content__nav"} 
          ${menuOpen && size.width < 768 ? `${"isMenu"}` : ""} 
          }`}
        >
          <ul>
            <li>
              <Link to="/tracking">Tracking</Link>
            </li>
            <li>
              <Link to="/profile">Service</Link>
            </li>
            <li>
              <Link to="/delivery">Book a Drone</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>

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
        <div className="header__content__toggle">
          {!menuOpen ? (
            <FontAwesomeIcon icon={faBars} onClick={menuToggleHandler} />
          ) : (
            <FontAwesomeIcon icon={faClose} onClick={menuToggleHandler} />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
