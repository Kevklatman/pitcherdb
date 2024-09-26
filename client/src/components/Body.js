import React from "react";
import { useState } from "react";
import CardGrid from "./CardGrid";
import SearchBar from "./SearchBar";

function Body() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPitcher, setSelectedPitcher] = useState(null);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePitcherClick = (pitcher) => {
    setSelectedPitcher(pitcher);
  };

  return (
    <div>
      <div className="search-bar">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div>
        <CardGrid searchTerm={searchTerm} onPitcherClick={handlePitcherClick} />
      </div>
    </div>
  );
}

export default Body;