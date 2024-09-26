import React from 'react';
import '../App.css';

function PlayerCard({ pitcher, onPitcherClick }) {
  const handleClick = () => {
    onPitcherClick(pitcher);
  };

  return (
    <div className="player-card" onClick={handleClick}>
      <h3>{pitcher.name}</h3>
      <p>ERA: {pitcher.era}</p>
      <p>{pitcher.From} to {pitcher.To}</p>
      {/* Add more pitcher details here */}
    </div>
  );
}

export default PlayerCard;
