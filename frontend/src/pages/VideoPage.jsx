import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CategorySugestions from "@components/video_page/CategorySugestions";
import Share from "@components/share/Share";
import Video from "../components/video_page/Video";

function VideoPage() {
  const [video, setVideo] = useState(null);
  const [arrCatId, setArrCatId] = useState([]);
  const [arrCatName, setArrCatName] = useState([]);

  const { id } = useParams();

  function getArrayOfCategoriesByVideoId(result) {
    const arrCatIdTemp = [];
    const arrCatNameTemp = [];
    result.forEach((item) => {
      arrCatIdTemp.push(parseInt(item.idCat, 10));
      arrCatNameTemp.push(item.cat);
    });

    setArrCatId(arrCatIdTemp);
    setArrCatName(arrCatNameTemp);
  }

  function getVideo(idArg) {
    axios
      .get(`${import.meta.env.VITE_PORT_BACKEND}/videos/cat/${idArg}`)
      .then((res) => {
        setVideo(res.data[0]);
        return res.data;
      })
      .then((result) => {
        getArrayOfCategoriesByVideoId(result);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    getVideo(id);
    window.scrollTo(0, 0);
  }, [id]);
  return (
    <div className="video-container">
      {video && arrCatId && arrCatName && (
        <div>
          <Video
            title={video.title}
            description={video.description}
            arrCatName={arrCatName}
            date={video.date}
            display={video.display}
            videoUrl={video.url}
          />
          <Share title={video.title} />
          <div className="section-container">
            <CategorySugestions arrCatId={arrCatId} vidName={video.title} />
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoPage;
