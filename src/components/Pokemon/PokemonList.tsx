import React from 'react';
import Pokemon from './Pokemon';
import usePokemonListService from './usePokemonListService';
import './PokemonList.css';

export interface PokemonResult {
  name: string;
  url: string;
}

export interface PokemonResults {
  count: number;
  next?: string;
  previous?: string;
  results: PokemonResult[];
}

const PokemonList: React.FC = () => {
  const service = usePokemonListService(0, 30);

  return (
  	<div className="Pokemon-list">
      {service.status === 'loading' && <div className="Loading" />}
      {service.status === 'loaded' &&
        service.payload.results.map(pokemon => (
      	  <Pokemon {...pokemon} key={pokemon.name} />
        ))}
      {service.status === 'error' && (
      	<div>Error</div>
      )}
    </div>
  );
};

export default PokemonList;
