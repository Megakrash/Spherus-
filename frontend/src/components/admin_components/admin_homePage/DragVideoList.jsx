import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

function DragVideoList({ id }) {
  const [videoName, setVideoName] = useState([]);
  const [show, setShow] = useState(false);

  const getVideoName = () => {
    axios
      .get(`${import.meta.env.VITE_PORT_BACKEND}/home/carousel/${id}`)
      .then((res) => {
        setVideoName(res.data);
        setShow(true);
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    getVideoName();
  }, []);

  return (
    <div className="dragVideoList">
      {videoName.length >= 1 && show === true && (
        <div className="dragVideoList_box">
          {videoName.map((infos) => {
            return (
              <p key={infos.id} className="dragVideoList_box_text">
                {infos.title}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default DragVideoList;

DragVideoList.propTypes = {
  id: PropTypes.number.isRequired,
};
