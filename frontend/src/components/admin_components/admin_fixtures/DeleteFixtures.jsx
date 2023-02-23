import React, { useState } from "react";
import axios from "axios";
import { FaPenFancy } from "react-icons/fa";
import PropTypes from "prop-types";
import HoverVideoPlayer from "react-hover-video-player";
import ChoiceHero from "../admin_heroSlider/ChoiceHero";

function DeleteFixtures({ el, getHeroInfo }) {
  const [choice, setChoice] = useState(false);
  const videoUrl = `${import.meta.env.VITE_PORT_BACKEND}/${el.url}`;

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
      <div className="actuallyHeroSlider_video">
        <HoverVideoPlayer
          videoClassName="actuallyHeroSlider_video_player"
          videoSrc={videoUrl}
          muted
        />
      </div>
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
    url: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
};
