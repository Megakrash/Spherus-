import React, { useState } from "react";
import axios from "axios";
import { FaPenFancy } from "react-icons/fa";
import PropTypes from "prop-types";
import ChoiceHero from "../admin_heroSlider/ChoiceHero";
import VideoCard from "../../category_video/VideoCard";

function DeleteFixtures({ el, getHeroInfo }) {
  const [choice, setChoice] = useState(false);

  const deleteFromFixture = (id) => {
    axios
      .delete(`${import.meta.env.VITE_PORT_BACKEND}/fixtures/${id}`)
      .then(() => getHeroInfo())
      .catch((err) => console.error(err));
  };

  const classButton = () => {
    if (choice === true) {
      return "actuallyHeroSlider_btn_activ";
    }
    return "actuallyHeroSlider_btn_inactiv";
  };

  return (
    <li className="fixtures-map">
      <VideoCard classname="fixtures-vid-slot" {...el} />
      <div className="fixtures-map_btn">
        <button
          type="button"
          className={classButton()}
          onClick={() => setChoice(!choice)}
        >
          Modify <FaPenFancy className="svg" />
        </button>
        <button
          className="deleteBtn fx_delete"
          type="button"
          onClick={() => deleteFromFixture(el.id)}
        >
          Delete
        </button>
      </div>
      {choice === true && (
        <div className="fixtures-map_choice">
          <ChoiceHero
            id={el.id}
            choice={choice}
            setChoice={setChoice}
            getHeroInfo={getHeroInfo}
            type={2}
          />
        </div>
      )}
    </li>
  );
}

export default DeleteFixtures;

DeleteFixtures.propTypes = {
  getHeroInfo: PropTypes.func.isRequired,
  el: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
};
