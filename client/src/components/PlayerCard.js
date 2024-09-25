import React, { useState, useEffect } from 'react';
import '../App.css'

function PlayerCard() {
  const [pitchers, setPitchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPitchers();
  }, []);

  const fetchPitchers = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://127.0.0.1:5555/pitchers');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPitchers(data.pitchers);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='card-grid'>
      {pitchers.map(pitcher => (
        <div key={pitcher.id} className='player-card'>
          <h3>{pitcher.name}</h3>
          <p>ERA: {pitcher.era}</p>
          <p>{pitcher.From} to {pitcher.To}</p>
          {/* Add more pitcher details here */}
        </div>
      ))}
    </div>
  );
}

export default PlayerCard;
