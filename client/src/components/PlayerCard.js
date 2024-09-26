import React from 'react';
import '../App.css';

function PlayerCard({ pitcher }) {
  return (   
    <button className='player-card'>
      <h3>{pitcher.name}</h3>
      <p>ERA: {pitcher.era}</p>
      <p>{pitcher.From} to {pitcher.To}</p>
      {/* Add more pitcher details here */}
    </button>
  );
}

export default PlayerCard;
