import React, { useState, useContext, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import MenuSearch from "../menus/MenuSearch";
import Toggle from "../menus/Toggle";
import UserContext from "../../../contexts/UserContext";
import AvatarUrlContext from "../../../contexts/AvatarUrlContext";
import MenuBurger from "../menus/MenuBurger";

function navbarDesktop({ handlePopUpLogIn, handleRegisterPopUp }) {
  const [isLoopClicked, setIsLoopClicked] = useState(false);
  const [isBurgerClicked, setIsBurgerClicked] = useState(false);
  const [user, setUser] = useState(null);
  const inputImgAvatar = useRef();

  const { id } = useContext(UserContext);
  const { avatarUrlContext } = useContext(AvatarUrlContext);

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
  }, [avatarUrlContext]);

  return (
    <div className="navbar-desktop">
      {isLoopClicked ? (
        <MenuSearch setIsLoopClicked={() => setIsLoopClicked()} />
      ) : (
        <button
          className="btn-svg"
          type="button"
          onClick={() => setIsLoopClicked(true)}
        >
          <svg
            className="loop"
            xmlns="http://www.w3.org/2000/svg"
            width="50px"
            height="50px"
            fill="currentColor"
            viewBox="0 0 16 20"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </button>
      )}
      <div className="toggle-input">
        <Toggle />
      </div>
      <button
        className="btn-img-avatar"
        type="button"
        onClick={() => setIsBurgerClicked(!isBurgerClicked)}
      >
        {user !== null && user.url !== undefined ? (
          <img
            ref={inputImgAvatar}
            className="img-avatar-profil"
            src={`${import.meta.env.VITE_PORT_BACKEND}/${user.url}`}
            alt="avatar"
          />
        ) : (
          <img
            className="img-avatar-profil"
            src="https://png.pngtree.com/png-clipart/20210129/ourlarge/pngtree-man-default-avatar-png-image_2813122.jpg"
            alt="avatar"
          />
        )}
      </button>
      {isBurgerClicked && (
        <MenuBurger
          isBurgerClicked={isBurgerClicked}
          setIsBurgerClicked={() => setIsBurgerClicked()}
          handlePopUpLogIn={() => handlePopUpLogIn()}
          handleRegisterPopUp={() => handleRegisterPopUp()}
        />
      )}
    </div>
  );
}

export default navbarDesktop;

navbarDesktop.propTypes = {
  handlePopUpLogIn: PropTypes.func.isRequired,
  handleRegisterPopUp: PropTypes.func.isRequired,
};
