import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import VideoCard from "@components/category_video/VideoCard";
import { useNavigate } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa";
import UserContext from "../../contexts/UserContext";

function Favorite() {
  const { id } = useContext(UserContext);

  const [favorite, setFavorite] = useState([]);

  const getFavorite = () => {
    axios
      .get(`${import.meta.env.VITE_PORT_BACKEND}/favorites/${id}`)
      .then((res) => {
        const uniqueArr = res.data.reduce((acc, current) => {
          const x = acc.find((item) => item.id === current.id);
          if (!x) {
            return acc.concat([current]);
          }
          return acc;
        }, []);
        setFavorite(uniqueArr);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getFavorite();
  }, []);

  const navigate = useNavigate();

  return (
    <div>
      <div className="category_video_main_container">
        <button
          type="button"
          className="prevBtn"
          onClick={() => {
            navigate(-1);
          }}
        >
          <FaAngleLeft className="arrow" />
        </button>

        {favorite.map((e) => (
          <div className="category_video_main_container_title" key={e.id}>
            {e.catName}
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
  );
}

export default Favorite;
