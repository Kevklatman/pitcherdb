import React from 'react';
import Home from './Home'; // Adjust the path as needed
import NavBar from './NavBar';
import Pitchers from './Pitchers';

function App() {
  const renderContent = () => {
    const path = window.location.pathname;

    switch (path) {
      case '/':
        return <Home />;
      case '/pitchers':
        return <Pitchers />;
      case '/stats':
      default:
        return <Home />;
    }
  };

  return (
    <div>
      {<NavBar/>}
      {renderContent()}
    </div>
  );
}

export default App;