import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import HoverVideoPlayer from "react-hover-video-player";
import { CiLock } from "react-icons/ci";
import { FaStar, FaRegStar } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import axios from "axios";

function VideoCard({ id, url, title, description, display }) {
  const videoUrl = `${import.meta.env.VITE_PORT_BACKEND}${url}`;
  const [favBtn, setFavBtn] = useState(false);
  const token = useContext(UserContext);

  const getFavorite = () => {
    axios
      .get(`${import.meta.env.VITE_PORT_BACKEND}/favorites/${token.id}`)
      .then((res) => {
        btn(res.data)
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getFavorite();
  }, []);


  const btn = (data) => {
    if (data.find((el) => el.id === id)) {
      setFavBtn(true)
    } else { setFavBtn(false) }
  }

  const setFavorite = () => {
    if (favBtn === false) {
      axios
        .post(`${import.meta.env.VITE_PORT_BACKEND}/favorites`, { userId: token.id, videoFavId: id })
        .then(() => {
          setFavBtn(true)
        })
        .catch(() => {
          console.error("not added to favorites");
        });
    }
    else {
      if (favBtn === true) {
        axios
          .delete(`${import.meta.env.VITE_PORT_BACKEND}/favorites/${id}`)
          .then(() => {
            setFavBtn(false)
          })
          .catch(() => {
            console.error("not deleted from favorites");
          });
      }
    }
  }

  return (
    <div className="videoCard">
      {token.userToken !== "" ? (
        <div className="main">
          <button
            type="button"
            className="videocard_fav_btn"
            onClick={setFavorite}
          >
            {favBtn ? (
              <FaStar className="videocard_fav_btn_on" />
            ) : (
              <FaRegStar className="videocard_fav_btn_off" />
            )}
          </button>
          <NavLink to={`/video/${id}`}>
            <div
              className="videocard">
              <HoverVideoPlayer
                videoClassName="videocard_video"
                videoSrc={videoUrl}
                muted
                // preload="none"
                playbackRangeStart={0}
                playbackRangeEnd={6}
              />

              <div className="videocard_video_description">
                <div>{title}</div>
                {/* <div>{description}</div> */}
              </div>
            </div>
          </NavLink>
        </div>
      ) : display === 1 ? (
        <div className="main">
          <button
            type="button"
            className="videocard_fav_btn"
            onClick={setFavBtn}
          >
            {favBtn ? (
              <div className="videocard_fav_btn_on">Vous devez être inscrit</div>
            ) : (
              <FaRegStar className="videocard_fav_btn_off" />
            )}
          </button>
          <NavLink to={`/video/${id}`}>
            <div
              className="videocard">
              <HoverVideoPlayer
                videoClassName="videocard_video"
                className="videocard_video"
                videoSrc={videoUrl}
                muted
                playbackRangeStart={0}
                playbackRangeEnd={6}
              />

              <div className="videocard_video_description">
                <div>{title}</div>

              </div>
            </div>
          </NavLink>
        </div>
      ) : (
        <div>
          <NavLink to={`/video/${id}`}>
            <div
              className="videocard_veil">
              <HoverVideoPlayer
                videoClassName="videocard_veil_video"
                className="videocard_veil_video"
                videoSrc={videoUrl}
                muted
                playbackRangeStart={0}
                playbackRangeEnd={6}
              />
              <CiLock className="videocard_veil_lock" />

              <div className="videocard_veil_video_description">
                <div>{title}</div>

              </div>
            </div>
          </NavLink>
        </div>
      )}

    </div>
  );
}

VideoCard.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  display: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};

export default VideoCard;
