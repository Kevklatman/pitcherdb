import {useState} from "react";
import CardGrid from "./CardGrid"; 
import SearchBar from "./SearchBar";

function Body() {
    const [searchTerm, setSearchTerm] = useState('');
  
    const handleSearch = (event) => {
      setSearchTerm(event.target.value);
    };
  
    return (
      <div>
        <div className="search-bar">
          <SearchBar onSearch={handleSearch} />
        </div>
        <div>
          <CardGrid searchTerm={searchTerm} />
        </div>
      </div>
    );
  }

export default Body;
