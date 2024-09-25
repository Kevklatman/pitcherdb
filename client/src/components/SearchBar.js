import React, { useState, useEffect } from "react";
import '../App.css';

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [pitchers, setPitchers] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5555/pitchers')
      .then(response => response.json())
      .then(data => setPitchers(data))
      .catch(error => console.error('Error fetching pitchers:', error));
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filterPitchers = () => {
    return pitchers.filter(pitcher =>
      pitcher.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div>
      <input
        className="search-bar"
        type="search"
        placeholder="Find a pitcher"
        value={searchQuery}
        onChange={handleSearch}
      />
      <ul>
        {filterPitchers().map(pitcher => (
          <li key={pitcher.id}>{pitcher.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchBar;
