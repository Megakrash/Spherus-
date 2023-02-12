import React, { useState, useEffect } from "react";
import axios from "axios";
import AddAdvert from "./AddAdvert";
import UpdateAdvert from "./UpdateAdvert";
import DeleteAdvert from "./DeleteAdvert";

function AdminAd() {
  const [pub, setPub] = useState([]);

  const getPub = () => {
    axios
      .get(`${import.meta.env.VITE_PORT_BACKEND}/publicities`)
      .then((res) => {
        setPub(res.data);
      });
  };

  useEffect(() => {
    getPub();
  }, []);

  return (
    <div className="adminad">
      <div className="adminad_box">
        <h1 className="adminad_box_title">Add new Advert</h1>
        <AddAdvert getPub={getPub} />
      </div>
      <div className="adminad_separate" />
      <div className="adminad_box">
        <h1 className="adminad_box_title">Update Advert</h1>
        {pub.length >= 1 && <UpdateAdvert pub={pub} getPub={getPub} />}
      </div>
      <div className="adminad_separate" />
      <div className="adminad_box">
        <h1 className="adminad_box_title">Delete Advert</h1>
        {pub.length >= 1 && <DeleteAdvert pub={pub} getPub={getPub} />}
      </div>
    </div>
  );
}

export default AdminAd;
