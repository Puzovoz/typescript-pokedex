import React from 'react';
import AppHeader from './components/AppHeader/AppHeader';
import PokemonList from './components/Pokemon/PokemonList';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <AppHeader />
      <PokemonList />
    </div>
  );
}

export default App;
