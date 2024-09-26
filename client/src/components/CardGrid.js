import React, { useState, useEffect } from 'react';
import '../App.css';
import PlayerCard from './PlayerCard';
import SinglePitcherView from './SinglePitcherView';

function CardGrid({ searchTerm, onPitcherClick }) {
  const [pitchers, setPitchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPitcher, setSelectedPitcher] = useState(null);

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

  const handlePitcherClick = (pitcher) => {
    setSelectedPitcher(pitcher);
    onPitcherClick(pitcher);
  };

  const handleBackClick = () => {
    setSelectedPitcher(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  if (selectedPitcher) {
    return <SinglePitcherView pitcher={selectedPitcher} onBackClick={handleBackClick} />;
  }

  return (
    <div className="card-grid">
      {filteredPitchers.map((pitcher) => (
        <PlayerCard key={pitcher.id} pitcher={pitcher} onPitcherClick={handlePitcherClick} />
      ))}
    </div>
  );
}

export default CardGrid;