import React from "react";
import '../App.css'

function SearchBar({ onSearch }) {
    return (
      <div>
        <input
          className="search-bar"
          type="search"
          placeholder="Find a pitcher"
          onChange={onSearch}
        />
      </div>
    );
  }

export default SearchBar;