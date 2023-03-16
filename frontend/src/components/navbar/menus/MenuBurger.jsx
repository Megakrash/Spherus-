import React, { useContext, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import {
  FaUser,
  FaUserPlus,
  FaQuestion,
  FaCog,
  FaRegStar,
  FaPowerOff,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Toggle from "./Toggle";
import UserContext from "../../../contexts/UserContext";

function MenuBurger({
  isBurgerClicked = false,
  setIsBurgerClicked,
  handlePopUpLogIn,
  handleRegisterPopUp,
}) {
  const { isAdmin, userToken, id } = useContext(UserContext);
  const [size, setSize] = useState(false);
  const [user, setUser] = useState(null);

  const inputImgAvatar = useRef();
  const refBurgerContainer = useRef();
  const navigate = useNavigate();

  function getUser() {
    axios
      .get(`${import.meta.env.VITE_PORT_BACKEND}/users_navbar/${id}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    getUser();
  }, []);

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

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        isBurgerClicked &&
        refBurgerContainer.current &&
        !refBurgerContainer.current.contains(e.target)
      ) {
        setIsBurgerClicked(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isBurgerClicked]);

  return (
    <div
      ref={refBurgerContainer}
      className={
        isBurgerClicked ? "menu-burger active" : "menu-burger inactive"
      }
    >
      {user && userToken && userToken.length > 0 ? (
        <div className="buttons">
          {isAdmin && isAdmin === 1 && (
            <NavLink to="/admin">
              <button
                className="btn btn-admin-panel"
                type="button"
                onClick={() => {
                  setIsBurgerClicked(false);
                }}
              >
                <FaCog className="signin-icon" /> Admin Panel
              </button>
            </NavLink>
          )}
          <div className="profile-favorites-container">
            <NavLink to="/profile">
              <div className="btn-profil-image-container">
                <button
                  className="btn btn-profil"
                  type="button"
                  onClick={() => {
                    setIsBurgerClicked(false);
                  }}
                >
                  <FaUser className="signin-icon" /> Profil
                </button>
                {user && (
                  <img
                    ref={inputImgAvatar}
                    className="img-avatar-profil"
                    src={`${import.meta.env.VITE_PORT_BACKEND}/${user.url}`}
                    alt="avatar"
                    onError={() => {
                      inputImgAvatar.current.src =
                        "https://png.pngtree.com/png-clipart/20210129/ourlarge/pngtree-man-default-avatar-png-image_2813122.jpg";
                    }}
                  />
                )}
              </div>
            </NavLink>

            <NavLink to="/favorite">
              <button
                className="btn btn-admin-panel"
                type="button"
                onClick={() => {
                  setIsBurgerClicked(false);
                }}
              >
                <FaRegStar className="signin-icon" /> Favorites
              </button>
            </NavLink>
          </div>

          <button
            className="btn btn-logout"
            type="button"
            onClick={() => {
              localStorage.removeItem("token");
              setIsBurgerClicked(false);
              navigate("/");
              window.location.reload();
            }}
          >
            <FaPowerOff className="logout-icon" /> Log out
          </button>
        </div>
      ) : (
        <div className="buttons">
          <button
            className="btn btn-login"
            type="button"
            onClick={() => {
              handlePopUpLogIn();
              setIsBurgerClicked(false);
            }}
          >
            <FaUser className="login-icon" /> Log in
          </button>
          <NavLink to="/registration">
            <button
              className="btn btn-signin"
              type="button"
              onClick={() => {
                setIsBurgerClicked(false);
              }}
            >
              <FaUserPlus className="signin-icon" /> Sign in
            </button>
          </NavLink>

          <NavLink to="#">
            <button
              className="btn btn-why-signin"
              type="button"
              onClick={() => {
                handleRegisterPopUp();
                setIsBurgerClicked(false);
              }}
            >
              <FaQuestion className="why-signin-icon" />
              <p>Why sign in ?</p>
            </button>
          </NavLink>
        </div>
      )}

      {!size && <Toggle />}
    </div>
  );
}

export default MenuBurger;

MenuBurger.propTypes = {
  isBurgerClicked: PropTypes.bool.isRequired,
  handlePopUpLogIn: PropTypes.func.isRequired,
  setIsBurgerClicked: PropTypes.func.isRequired,
  handleRegisterPopUp: PropTypes.func.isRequired,
};
