import React from "react";
import Card from "./Card";
import SearchBar from "./SearchBar";

function Body(){
   return(
   <div>
    <div className="search-bar">
        <SearchBar/>
    </div>
   <div>
        <Card/>
    </div>
    </div>
)}

export default Body;
