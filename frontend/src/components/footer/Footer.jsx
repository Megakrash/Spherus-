import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import {
  FaInstagramSquare,
  FaFacebookSquare,
  FaTwitterSquare,
  FaArrowAltCircleUp,
} from "react-icons/fa";

function Footer() {
  const [size, setSize] = useState(false);

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
    <div className="footer">
      <div className="footer_container_logo">
        <NavLink to="/">
          <img
            className="footer_logo"
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
      </div>
      <div className="footer_social">
        <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
          <FaInstagramSquare className="footer_social_icon" />
        </a>
        <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
          <FaFacebookSquare className="footer_social_icon" />
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
          <FaTwitterSquare className="footer_social_icon" />
        </a>
      </div>
      <div className="footer_link">
        <div className="footer_link_url">
          <NavLink to="/policy">
            <p className="footer_link_url_txt">Privacy Policy</p>
          </NavLink>
          <NavLink to="/cookies">
            <p className="footer_link_url_txt">Cookies</p>
          </NavLink>
          <NavLink to="/termsofservices">
            <p className="footer_link_url_txt">Terms of Services</p>
          </NavLink>
        </div>

        <div className="footer_link_btn">
          <button
            type="button"
            className="btnToTop"
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            <FaArrowAltCircleUp />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Footer;
