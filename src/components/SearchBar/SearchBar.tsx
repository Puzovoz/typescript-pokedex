import React, { useState } from 'react';
import PokemonList from '../Pokemon/PokemonList';
import './SearchBar.css'

const SearchBar = () => {
  const [input, setInput] = useState<string>('');

  return (
  	<>
      <input className="Search-bar" placeholder="Search" onChange={event => setInput(event.target.value)} />
      <PokemonList input={input} />
    </>
  );
}

export default SearchBar;