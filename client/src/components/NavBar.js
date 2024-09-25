import React from "react";
import styles from '../App.css';

function NavBar() {
  return (
    <div>
    <nav className='navbar'>
      <div className='navLinks'>
        <a href="/Home">Home</a>
        <a href="/pitchers">Pitchers</a>
        <a href="/stats">Stats</a>
        <a href="/about">About</a>
      </div>
    </nav>
    </div>

  );
}

export default NavBar;
