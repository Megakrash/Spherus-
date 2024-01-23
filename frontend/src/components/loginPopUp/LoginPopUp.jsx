import axios from "axios";
import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { FaSkull } from "react-icons/fa";

function LoginPopUp({ setUserContext, setControlPopUpLogIn }) {
  const navigate = useNavigate();

  function navigateToRegistration() {
    navigate("/registration");
  }

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const login = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_PORT_BACKEND}/login`, loginDetails)
      .then((res) => {
        setUserContext(res.data);
        localStorage.setItem(
          "token",
          JSON.stringify({
            userToken: res.data.token,
            isAdmin: res.data.isAdmin,
            id: res.data.id,
          })
        );
        setControlPopUpLogIn(false);
        window.location.reload();
      })

      .catch((err) => console.warn(err));
  };

  function closePopUp() {
    setControlPopUpLogIn(false);
  }

  return (
    <div className="login-pop-up">
      <div className="login-pop-up_card">
        <h2>Connexion</h2>
        <button type="button" onClick={closePopUp} aria-label="Close modal">
          <FaSkull className="close_btn" />
        </button>
        <form className="login-form" onSubmit={login}>
          <label htmlFor="email" aria-label="email">
            <input
              type="email"
              className="email"
              name="email"
              placeholder="Your email address"
              onChange={(e) => {
                setLoginDetails({ ...loginDetails, email: e.target.value });
              }}
            />
          </label>
          <label htmlFor="password" aria-label="Password">
            <input
              type="password"
              className="password"
              name="password"
              placeholder="Your password"
              onChange={(e) =>
                setLoginDetails({ ...loginDetails, password: e.target.value })
              }
            />
          </label>
          <p className="forgotten-password">
            Password forgotten ?{" "}
            <NavLink to="/forgot" onClick={() => setControlPopUpLogIn(false)}>
              Reset it
            </NavLink>
          </p>
          <label htmlFor="submit" aria-label="Submit">
            <button className="submitBtn loginVerification" type="submit">
              <div className="svg-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path
                    fill="currentColor"
                    d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                  />
                </svg>
              </div>
              <span>Submit</span>
            </button>
          </label>
          <label className="btn-registration-label" htmlFor="redirecting">
            <button
              className="btn-registration"
              type="submit"
              onClick={navigateToRegistration}
            >
              Create your account
            </button>
          </label>
        </form>
      </div>
    </div>
  );
}

LoginPopUp.propTypes = {
  setUserContext: PropTypes.func.isRequired,
  setControlPopUpLogIn: PropTypes.func.isRequired,
};

export default LoginPopUp;
