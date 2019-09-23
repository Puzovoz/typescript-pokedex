import React, { useState, useEffect } from 'react';
import Pokemon from './Pokemon';
import PokemonListService from './PokemonListService';
import { PokemonResults, ILink } from '../../models/IPokemon';
import './PokemonList.css';

const PokemonList: React.FC = () => {
  const [loadedPokemon, setLoadedPokemon] = useState<PokemonResults>();
  const [renderedPokemon, setRenderedPokemon] = useState<ILink[]>();
  const [offset, setOffset] = useState<number>(50);
  const [rowSize, setRowSize] = useState<number>(9);

  const handleScroll = () =>  {
    if (document.documentElement.clientHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
    const newRowSize = calculateRowSize()
    setOffset(offset => offset + (newRowSize - offset % newRowSize) % newRowSize + newRowSize * 6);    
  };

  const calculateRowSize = () => {
    return Math.floor(document.documentElement.clientWidth * 0.8 / 140)
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await PokemonListService(0, 807)
      setLoadedPokemon(result)

      const currentLoadedPokemon = 6 * calculateRowSize()
      setRenderedPokemon(result.results.slice(0, currentLoadedPokemon))
      setOffset(currentLoadedPokemon)
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
