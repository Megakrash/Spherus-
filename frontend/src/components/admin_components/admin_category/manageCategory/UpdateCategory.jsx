import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { FaAngleLeft, FaCheck, FaPen, FaTrashAlt } from "react-icons/fa";
import VideosOnCat from "./VideosOnCat";

function UpdateCategory({ id, name, getAllCat }) {
  const [showCat, setShowCat] = useState(false);
  const [showUpdateName, setShowUpdateName] = useState(false);
  const [newCatName, setNewCatName] = useState("");

  const updateCatName = () => {
    axios
      .patch(`${import.meta.env.VITE_PORT_BACKEND}/categories/${id}`, {
        name: newCatName,
      })
      .then(() => {
        getAllCat();
      })
      .catch(() => {
        console.error("Error update the category name");
      });
  };

  const deleteCat = () => {
    axios
      .delete(`${import.meta.env.VITE_PORT_BACKEND}/categories/${id}`, {
        name: newCatName,
      })
      .then(() => {
        setShowUpdateName(false);
        getAllCat();
      })
      .catch(() => {
        console.error("Error update the category name");
      });
  };

  const classButton = () => {
    if (showCat === true) {
      return "updateCategory_btn_activ";
    }
    return "updateCategory_btn";
  };

  return (
    <div className="updateCategory">
      <div className={classButton()}>
        <button
          type="button"
          className="updateCategory_btn_name"
          onClick={() => {
            setShowCat(!showCat);
          }}
        >
          {name}
        </button>
        <div className="updateCategory_btn_update">
          <button
            className="updateCategory_btn_update_faPen"
            type="button"
            onClick={() => {
              setShowUpdateName(!showUpdateName);
            }}
          >
            <FaPen
              className={showUpdateName === true ? "svgPen_activ" : "svgPen"}
            />
          </button>
          {showUpdateName === true && (
            <form className="updateCategory_btn_update_form" action="submit">
              <input
                type="text"
                id="name"
                placeholder="New category name"
                onChange={(e) => setNewCatName(e.target.value)}
                required
              />
              <button
                className="updateCategory_btn_update_form_faCheck"
                type="button"
                onClick={() => {
                  updateCatName();
                }}
              >
                <FaCheck className="svgCheck" />
              </button>
            </form>
          )}
        </div>
        <button
          className="updateCategory_btn_trash"
          type="button"
          onClick={() => {
            deleteCat();
          }}
        >
          <FaTrashAlt className="svgTrash" />
        </button>
        <button
          type="button"
          className="updateCategory_btn_show"
          onClick={() => {
            setShowCat(!showCat);
          }}
        >
          Show category <FaAngleLeft className="svgsamere" />
        </button>
      </div>

      {showCat === true && (
        <VideosOnCat
          id={id}
          name={name}
          showCat={showCat}
          setShowCat={setShowCat}
        />
      )}
    </div>
  );
}

export default UpdateCategory;

UpdateCategory.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  getAllCat: PropTypes.func.isRequired,
};
