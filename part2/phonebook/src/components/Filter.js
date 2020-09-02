import React from "react";

const Filter = (props) => {
  const { setSearch } = props;

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  return (
    <div>
      filter shown with <input type="text" onChange={handleSearch} />
    </div>
  );
};

export default Filter;
