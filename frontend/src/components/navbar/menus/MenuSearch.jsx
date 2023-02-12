import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

function MenuSearch({ setIsLoopClicked }) {
  const [videos, setVideos] = useState([]);
  const [query, setQuery] = useState("");

  const inputRef = useRef();

  function getVideos() {
    axios
      .get(`${import.meta.env.VITE_PORT_BACKEND}/videos`)
      .then((res) => {
        setVideos(res.data);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    getVideos();
    inputRef.current.focus();
  }, []);

  return (
    <div className="menu-search">
      <FaTimes
        className="btn-close-search-bar"
        onClick={() => setIsLoopClicked()}
      />
      <input
        className="input-search-video"
        ref={inputRef}
        value={query}
        type="search"
        placeholder="Search video by name"
        onChange={(e) => setQuery(e.target.value)}
      />
      {videos.length > 0 && (
        <div className="videos-list">
          {videos
            .filter((video) =>
              video.title.toLowerCase().includes(query.toLowerCase())
            )
            .sort()
            .map((video) => {
              return (
                <NavLink key={video.id} to={`/video/${video.id}`} onClick>
                  <p className="video-in-list">{video.title}</p>
                </NavLink>
              );
            })}
        </div>
      )}
    </div>
  );
}

export default MenuSearch;

MenuSearch.propTypes = {
  setIsLoopClicked: PropTypes.func.isRequired,
};
