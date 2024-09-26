import React, { useState } from 'react';
import Home from './Home';
import NavBar from './NavBar';
import Pitchers from './Pitchers';
import SinglePitcherView from './SinglePitcherView';
import PlayerList from './PlayerList';

function App() {
  const [selectedPitcher, setSelectedPitcher] = useState(null);

  const renderContent = () => {
    const path = window.location.pathname;

    if (path === '/') {
      return <Home />;
    } else if (path === '/pitchers') {
      return <Pitchers />;
    } else if (path.startsWith('/pitchers/')) {
      const pitcherId = path.split('/')[2];
      return <SinglePitcherView pitcherId={pitcherId} />;
    }else {
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