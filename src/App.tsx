import React from 'react';
import AppHeader from './components/AppHeader/AppHeader';
import SearchBar from './components/SearchBar/SearchBar';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <AppHeader />
      <SearchBar />
    </div>
  );
}

export default App;
