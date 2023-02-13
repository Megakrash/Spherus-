import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import HoverVideoPlayer from "react-hover-video-player";

function VideosOnCat({ id, name }) {
  const [videosInCat, setVideosInCat] = useState([]);
  const [allVideos, setAllVideos] = useState([]);
  const [showVideos, setShowVideos] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [videoToAdd, setVideoToAdd] = useState("");
  const videoUrl = `${import.meta.env.VITE_PORT_BACKEND}/`;

  const getVideosInCat = () => {
    axios
      .get(`${import.meta.env.VITE_PORT_BACKEND}/videos/categories/${id}`)
      .then((res) => {
        setVideosInCat(res.data);
        setShowVideos(true);
      })
      .catch(() => {
        console.error("Error to get the videos");
      });
  };
  const getAllVideos = () => {
    axios
      .get(`${import.meta.env.VITE_PORT_BACKEND}/videos`)
      .then((res) => {
        setAllVideos(res.data);
      })
      .catch(() => {
        console.error("Error to get the videos");
      });
  };

  useEffect(() => {
    getVideosInCat();
    getAllVideos();
  }, []);

  const deleteVideo = (idVideo) => {
    axios
      .delete(
        `${import.meta.env.VITE_PORT_BACKEND}/videos/cat/${idVideo}/${id}`
      )
      .then(() => {
        getVideosInCat();
      })
      .catch(() => {
        console.error("Error delete the videos");
      });
  };

  const postNewVideoInCat = () => {
    axios
      .post(`${import.meta.env.VITE_PORT_BACKEND}/category/video`, {
        videoId: videoToAdd,
        categoryId: id,
      })
      .then(() => {
        getVideosInCat();
        setShowAdd(false);
      })
      .catch(() => {
        console.error("Error add the videos");
      });
  };

  const handleChange = (e) => {
    setVideoToAdd(e.target.value);
  };

  const filterVideos = () => {
    return allVideos.filter(
      (item) => !videosInCat.some((video) => video.id === item.id)
    );
  };

  return (
    <div className="videosOnCat">
      {showVideos === true && (
        <div className="videosOnCat_curent">
          <p className="videosOnCat_curent_title">
            Current videos in "{name}" category
          </p>
          <div className="videosOnCat_curent_box">
            {videosInCat.map((infos) => {
              return (
                <div key={infos.id} className="videosOnCat_curent_box_card">
                  <HoverVideoPlayer
                    videoClassName="videosOnCat_curent_box_card_video"
                    className="videosOnCat_curent_box_card_video"
                    videoSrc={videoUrl + infos.url}
                    muted
                    playbackRangeStart={0}
                    playbackRangeEnd={6}
                  />
                  <p className="videosOnCat_curent_box_card_title">
                    {infos.title}
                  </p>
                  <button
                    className="deleteBtn erase"
                    type="button"
                    onClick={() => {
                      deleteVideo(infos.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <div className="videosOnCat_add">
        <div className="videosOnCat_add_box">
          <p className="videosOnCat_curent_title">Add video</p>
          <button
            className="icon-btn add-btn"
            type="button"
            onClick={() => {
              setShowAdd(!showAdd);
            }}
          >
            <div className="add-icon" />
            <div className="btn-txt">Add video</div>
          </button>
        </div>
        {showAdd === true && allVideos.length >= 1 && (
          <div className="videosOnCat_add_video">
            <select
              className="videosOnCat_add_video_select"
              onChange={handleChange}
            >
              <option value="">---</option>
              {filterVideos().map((infos) => {
                return (
                  <option key={infos.name} value={infos.id}>
                    {infos.title}
                  </option>
                );
              })}
            </select>
            <button
              className="submitBtn"
              type="button"
              value="post"
              onClick={() => postNewVideoInCat()}
            >
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
          </div>
        )}
      </div>
    </div>
  );
}

export default VideosOnCat;

VideosOnCat.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};
