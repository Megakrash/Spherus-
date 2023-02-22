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
      <a
        className="pub_link"
        target="_blank"
        href={pub.url_link}
        rel="noreferrer"
      >
        <img className="pub_link_img" src={urlImg} alt={pub.name} />
      </a>
    </div>
  );
}

export default Advert;

Advert.propTypes = {
  id: PropTypes.number.isRequired,
};
