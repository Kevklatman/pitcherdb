import React from 'react';
import Home from './Home';
import NavBar from './NavBar';
import Pitchers from './Pitchers';
import SinglePitcherCard from './SinglePitcherCard';

function App() {
  const handlePitcherClick = (pitcherId) => {
    window.location.pathname = `/pitchers/${pitcherId}`;
  };

  const renderContent = () => {
    const path = window.location.pathname;

    switch (path) {
      case '/':
        return <Home />;
      case '/pitchers':
        return <Pitchers onPitcherClick={handlePitcherClick} />;
      case '/pitchers/:pitcherId':
        const pitcherId = path.split('/')[2];
        return <SinglePitcherCard pitcherId={pitcherId} />;
      case '/stats':
      default:
        return <Home />;
    }
  };

  return (
    <div>
      <NavBar />
      {renderContent()}
    </div>
  );
}

export default App;