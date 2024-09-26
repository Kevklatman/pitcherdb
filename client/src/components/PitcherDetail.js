import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function PitcherDetail() {
  const { pitcherId } = useParams();
  const [pitcher, setPitcher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPitcher();
  }, []);

  const fetchPitcher = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://127.0.0.1:5555/pitchers/${pitcherId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPitcher(data.pitcher);
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
      <h2>{pitcher.name}</h2>
      {/* Display other pitcher details here */}
    </div>
  );
}

export default PitcherDetail;