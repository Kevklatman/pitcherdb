import React from 'react';
import '../App.css';

function SinglePitcherCard({ pitcher }) {
  if (!pitcher) {
    return null;
  }

  return (
    <div className='player-card'>
      <h3>{pitcher.name}</h3>
      <p>ERA: {pitcher.era}</p>
      <p>{pitcher.From} to {pitcher.To}</p>
      {/* Add more pitcher details here */}
    </div>
  );
}

export default SinglePitcherCard;