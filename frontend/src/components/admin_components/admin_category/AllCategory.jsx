import React from "react";
import PropTypes from "prop-types";
import UpdateCategory from "./manageCategory/UpdateCategory";

function AllCategory({ allCat, getAllCat }) {
  return (
    <div className="allCategory">
      <p className="allCategory_title">All category</p>
      {allCat.map((infos) => {
        return (
          <UpdateCategory
            key={infos.id}
            id={infos.id}
            name={infos.name}
            getAllCat={getAllCat}
          />
        );
      })}
    </div>
  );
}

export default AllCategory;

AllCategory.propTypes = {
  allCat: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  getAllCat: PropTypes.func.isRequired,
};
