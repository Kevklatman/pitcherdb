import React from 'react';

function SinglePitcherView({ pitcherId }) {
  // Fetch the pitcher details based on the pitcherId
  // Render the pitcher details in the component

  return (
    <div>
      <h2>Pitcher Details</h2>
      <p>
        {pitcherId.name}
      </p>
    </div>
  );
}

export default SinglePitcherView;