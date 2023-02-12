import React, { useState, useEffect } from "react";
import axios from "axios";
import DeleteVideo from "./DeleteVideo";
import UpdateVideo from "./UpdateVideo";
import UploadVideo from "./UploadVideo";

function AdminVideos() {
  const [video, setVideo] = useState([]);

  const getVideo = () => {
    axios
      .get(`${import.meta.env.VITE_PORT_BACKEND}/videos`)
      .then((res) => {
        setVideo(res.data);
      })

      .catch(() => {
        console.error("video not found");
      });
  };

  useEffect(() => {
    getVideo();
  }, []);

  return (
    <div className="adminvideo_container">
      <div>
        <UploadVideo getVideo={getVideo} />
        <DeleteVideo video={video} getVideo={getVideo} />
        <UpdateVideo video={video} getVideo={getVideo} />
      </div>
    </div>
  );
}

export default AdminVideos;
