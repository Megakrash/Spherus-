import React, { useState, useEffect } from "react";
import axios from "axios";
import AddCategory from "./AddCategory";
import AllCategory from "./AllCategory";

function AdminCategory() {
  const [allCat, setAllCat] = useState([]);
  const [showAdd, setShowAdd] = useState(false);

  const getAllCat = () => {
    axios
      .get(`${import.meta.env.VITE_PORT_BACKEND}/categories`)
      .then((res) => {
        setAllCat(res.data);
      })
      .catch(() => {
        console.error("Error to get the category");
      });
  };

  useEffect(() => {
    getAllCat();
  }, []);

  return (
    <div className="adminCategory">
      <div className="adminCategory_add">
        <div className="adminCategory_add_btn">
          <h1>Add new category</h1>
          <button
            className="icon-btn add-btn"
            type="button"
            onClick={() => {
              setShowAdd(!showAdd);
            }}
          >
            <div className="add-icon" />
            <div className="btn-txt">Add new category</div>
          </button>
        </div>
        {showAdd === true && (
          <AddCategory getAllCat={getAllCat} setShowAdd={setShowAdd} />
        )}
      </div>

      <div className="adminCategory_cat">
        {allCat.length >= 1 && (
          <AllCategory allCat={allCat} getAllCat={getAllCat} />
        )}
      </div>
    </div>
  );
}
export default AdminCategory;
