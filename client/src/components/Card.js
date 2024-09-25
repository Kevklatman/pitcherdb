import React from 'react';
import PlayerCard from './PlayerCard';


function CardGrid() {
  // Your existing App.js content goes here
  return (
    <div>
      <div className="h2">
        <p >
          Pitchers
        </p>
      </div>
        <p>
            <PlayerCard/>
        </p>
      
    </div>
  );
}

export default CardGrid;