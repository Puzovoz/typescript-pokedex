import React, { useState, useEffect } from 'react';
import Pokemon from './Pokemon';
import PokemonListService from './PokemonListService';
import { PokemonResults, ILink } from '../../models/IPokemon';
import './PokemonList.css';

const PokemonList: React.FC = () => {
  const [loadedPokemon, setLoadedPokemon] = useState<PokemonResults>();
  const [renderedPokemon, setRenderedPokemon] = useState<ILink[]>();
  const [offset, setOffset] = useState<number>(50);

  const handleScroll = () =>  {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
    setOffset(offset => offset + 50);    
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await PokemonListService(0, 807)
      setLoadedPokemon(result)
      setRenderedPokemon(result.results.slice(0, 50))
    }
    fetchData();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    loadedPokemon && setRenderedPokemon(loadedPokemon.results.slice(0, offset));
  }, [offset])

  return (
  	<div className="Pokemon-list">
      {renderedPokemon && renderedPokemon.map(pokemon => (
      	  <Pokemon {...pokemon} key={pokemon.name} />
        ))}
    </div>
  );
};

export default PokemonList;
