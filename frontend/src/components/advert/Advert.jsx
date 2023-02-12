import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

function Advert({ id }) {
  const [pub, setPub] = useState([]);

  const urlImg = `${import.meta.env.VITE_PORT_BACKEND}${pub.url_image}`;

  const getPub = () => {
    axios
      .get(`${import.meta.env.VITE_PORT_BACKEND}/publicities/${id}`)
      .then((res) => {
        setPub(res.data);
      });
  };

  useEffect(() => {
    getPub();
  }, []);

  return (
    <div className="pub">
      <div className="pub_box">
        <a className="pub_box_link" href={pub.url_link}>
          <img className="pub_box_link_img" src={urlImg} alt={pub.name} />
        </a>

        <div className="pub_box_text">
          <p className="pub_box_text_name">{pub.name}</p>
          <p className="pub_box_text_desc">{pub.description}</p>
          <a href={pub.url_link}>
            <button type="button" className="cssbuttons-io-button">
              {" "}
              Go to
              <div className="icon">
                <svg
                  height="24"
                  width="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path
                    d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Advert;

Advert.propTypes = {
  id: PropTypes.number.isRequired,
};
