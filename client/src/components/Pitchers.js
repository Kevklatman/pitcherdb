import React from 'react';
import PlayerCard from './PlayerCard';

function Pitchers({ pitchers, onPitcherClick }) {
  return (
    <div>
      {pitchers.map(pitcher => (
        <PlayerCard
          key={pitcher.id}
          pitcher={pitcher}
          onPitcherClick={onPitcherClick}

        />
      ))}
    </div>
  );
}

export default Pitchers;