import React, { useState, useEffect } from 'react';
import '../App.css';
import PlayerCard from './PlayerCard';

function CardGrid({ searchTerm }) {
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

  const filteredPitchers = pitchers.filter((pitcher) =>
    pitcher.name && pitcher.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="card-grid">
      {filteredPitchers.map((pitcher) => (
        <PlayerCard key={pitcher.id} pitcher={pitcher} />
      ))}
    </div>
  );
}

export default CardGrid;
