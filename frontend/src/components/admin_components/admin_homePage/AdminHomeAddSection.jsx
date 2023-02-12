import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import PopupAddComponent from "./PopupAddComponent";
import AdminHomeDragInComp from "./AdminHomeDragInComp";

function AdminHomeAddSection({ setAddSection, setAddPub, getHome }) {
  const [cat, setCat] = useState([]);
  const [idCat, setIdCat] = useState();
  const [check, setCheck] = useState(false);
  const [newSectionId, setNewSectionId] = useState();

  const type = 1;

  const getCat = () => {
    axios
      .get(`${import.meta.env.VITE_PORT_BACKEND}/categories`)
      .then((res) => {
        setCat(res.data);
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    getCat();
  }, []);

  const handleChange = (e) => {
    setIdCat(e.target.value);
  };

  const addComp = () => {
    axios
      .post(`${import.meta.env.VITE_PORT_BACKEND}/home`, {
        position: 0,
        type: `${type}`,
        idLink: `${idCat}`,
      })
      .then((res) => {
        setNewSectionId(res.data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="adminHomeAddSection">
      {cat.length >= 1 && check === false && (
        <form className="adminHomeAddSection_form">
          {newSectionId === undefined && (
            <label
              className="adminHomeAddSection_form_label"
              htmlFor="category-select"
            >
              Choose the video category to link with this section <br />
              <select
                className="adminHomeAddSection_form_label_select"
                id="publicity-select"
                onChange={handleChange}
              >
                <option value="">---</option>
                {cat.map((infos) => {
                  return (
                    <option key={infos.id} value={infos.id}>
                      {infos.name}
                    </option>
                  );
                })}
              </select>
            </label>
          )}
          {idCat !== undefined && newSectionId === undefined && (
            <button
              className="submitBtn"
              type="button"
              onClick={() => {
                addComp();
              }}
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
              <span>Apply</span>
            </button>
          )}
          {idCat !== undefined && newSectionId !== undefined && (
            <div className="adminHomeAddSection_form_drag">
              <p className="adminHomeAddSection_form_drag_title">
                Choose video for carousel
              </p>
              <AdminHomeDragInComp
                idCat={idCat}
                getHome={getHome}
                idSection={newSectionId[0].insertId}
                setCheck={setCheck}
              />
            </div>
          )}
        </form>
      )}
      {check === true && (
        <PopupAddComponent
          setAddPub={setAddPub}
          setAddSection={setAddSection}
        />
      )}
    </div>
  );
}

export default AdminHomeAddSection;

AdminHomeAddSection.propTypes = {
  setAddSection: PropTypes.func.isRequired,
  setAddPub: PropTypes.func.isRequired,
  getHome: PropTypes.func.isRequired,
};
