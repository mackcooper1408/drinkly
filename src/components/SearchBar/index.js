import { faSearch, faBackspace } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useRef } from "react";
import { throttle } from "throttle-debounce";

import "./SearchBar.css";

function SearchBar({ search, placeholder }) {
  const initialState = { term: "" };
  const [formData, setFormData] = useState(initialState);

  const throttleSearch = useRef(
    throttle(1000, (formData) => {
      search(formData.term);
    })
  );

  function handleSubmit(evt) {
    evt.preventDefault();
    search(formData.term);
    setFormData(initialState);
  }

  function handleReset() {
    search("");
    setFormData(initialState);
  }

  /** Update local state w/curr state of input elem */
  function handleChange(evt) {
    const { name, value } = evt.target;
    const newFormData = { ...formData, [name]: value };

    throttleSearch.current(newFormData);
    setFormData(newFormData);
  }

  return (
    <form
      className="form-inline justify-content-center mt-4"
      onSubmit={handleSubmit}
    >
      <div className="form-group position-relative border-top border-bottom col-12">
        <FontAwesomeIcon icon={faSearch} className="search" />
        <FontAwesomeIcon
          icon={faBackspace}
          onClick={handleReset}
          className="backspace"
        />
        <input
          type="text"
          className="form-control pl-5 bg-transparent text-white"
          name="term"
          value={formData.term}
          placeholder={placeholder}
          onChange={handleChange}
        />
      </div>
    </form>
  );
}

export default SearchBar;
