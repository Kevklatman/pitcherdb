import React from 'react';

function SinglePitcherView({ pitcher, onBackClick }) {
  return (
    <div>
      <h2>Pitcher Details</h2>
      <p>Name: {pitcher.name}</p>
      <p>ERA: {pitcher.era}</p>
      <p>From: {pitcher.From}</p>
      <p>To: {pitcher.To}</p>
      {/* Add more pitcher details here */}
      <button onClick={onBackClick}>Back</button>
    </div>
  );
}

export default SinglePitcherView;