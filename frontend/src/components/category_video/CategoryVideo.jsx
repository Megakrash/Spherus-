import axios from "axios";
import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa";
import VideoCard from "./VideoCard";

function CategoryVideo() {
  const { id } = useParams();

  const [video, setVideo] = useState([]);

  const getVideo = () => {
    axios
      .get(`${import.meta.env.VITE_PORT_BACKEND}/videos/categories/${id}`)
      .then((res) => {
        setVideo(res.data);
      });
  };

  useEffect(() => {
    getVideo();
  }, [id]);

  return (
    <div className="category_video">
      <div className="category_video_main">
        <div className="category_video_main_headerCtn">
          <NavLink to="/" className="category_video_main_headerCtn_prevBtn">
            <FaAngleLeft className="arrow" />
          </NavLink>
          <div className="category_video_main_headerCtn_name">
            {video.length > 1 &&
              video[0].cat.charAt(0).toUpperCase() + video[0].cat.slice(1)}
          </div>
        </div>
        <div className="category_video_main_containerbis">
          {video.map((e) => (
            <div key={e.id}>
              <VideoCard
                id={e.id}
                url={e.url}
                title={e.title}
                description={e.description}
                display={e.display}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryVideo;
