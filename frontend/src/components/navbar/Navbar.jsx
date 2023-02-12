import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import NavbarMobile from "./navbarMobile/NavbarMobile";
import ThemeContext from "../../contexts/ThemeContext";
import NavbarDesktop from "./navbarDesktop/NavbarDesktop";

function Navbar({ handlePopUpLogIn, handleRegisterPopUp }) {
  const [size, setSize] = useState(false);
  const { themeToggle } = useContext(ThemeContext);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 600) {
        setSize(true);
      } else {
        setSize(false);
      }
    });
    if (window.innerWidth >= 600) {
      setSize(true);
    } else {
      setSize(false);
    }
  }, [window.innerWidth]);

  return (
    <div className="navbar">
      <div className="logo-container">
        {themeToggle ? (
          <NavLink to="/">
            <img
              className="logo"
              src={
                size
                  ? `${
                      import.meta.env.VITE_PORT_BACKEND
                    }/assets/images/front/logo_spherus_long_dark.png`
                  : `${
                      import.meta.env.VITE_PORT_BACKEND
                    }/assets/images/front/logo_spherus_short.png`
              }
              alt="spherus"
            />
          </NavLink>
        ) : (
          <NavLink to="/">
            <img
              className="logo"
              src={
                size
                  ? `${
                      import.meta.env.VITE_PORT_BACKEND
                    }/assets/images/front/logo_spherus_long_light.png`
                  : `${
                      import.meta.env.VITE_PORT_BACKEND
                    }/assets/images/front/logo_spherus_short.png`
              }
              alt="spherus"
            />
          </NavLink>
        )}
      </div>
      {!size ? (
        <NavbarMobile
          handlePopUpLogIn={() => handlePopUpLogIn()}
          handleRegisterPopUp={() => handleRegisterPopUp()}
        />
      ) : (
        <NavbarDesktop
          handlePopUpLogIn={() => handlePopUpLogIn()}
          handleRegisterPopUp={() => handleRegisterPopUp()}
        />
      )}
    </div>
  );
}

export default Navbar;

Navbar.propTypes = {
  handlePopUpLogIn: PropTypes.func.isRequired,
  handleRegisterPopUp: PropTypes.func.isRequired,
};
