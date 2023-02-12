import React, { useState, useEffect } from "react";
import axios from "axios";
import Section from "../section/Section";

function HomeDisplay() {
  const [currentHome, setCurrentHome] = useState({});

  const getHome = () => {
    axios
      .get(`${import.meta.env.VITE_PORT_BACKEND}/home`)
      .then((res) => {
        setCurrentHome(res.data);
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    getHome();
  }, []);

  return (
    <div className="homeDisplay">
      {currentHome.length >= 1 && (
        <div>
          {currentHome.map((infos) => {
            return (
              <div key={infos.id}>
                <Section
                  type={infos.type}
                  id={infos.id}
                  idLink={infos.idLink}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default HomeDisplay;
