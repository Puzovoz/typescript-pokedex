import React from 'react';
import './AppHeader.css';
import logo from './logo.svg';

const AppHeader = () => {
  return (
    <header className="App-header">
      <img src={logo} className='App-logo' />
      <div className="Title">Pokédex</div>
    </header>
  );
}

export default AppHeader;
