import React, { useState, useEffect } from 'react';

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
    <div>
      <h1>Pitchers</h1>
      <ul>
        {pitchers.map(pitchers => (
          <li key={pitchers.ROWID}>{pitchers.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default PlayerCard;
