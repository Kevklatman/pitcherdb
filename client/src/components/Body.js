import React from "react";
import CardGrid from "./CardGrid"; 
import SearchBar from "./SearchBar";

function Body(){
   return(
   <div>
    <div className="search-bar">
        <SearchBar/>
    </div>
   <div>
        <CardGrid/>
    </div>
    </div>
)}

export default Body;
