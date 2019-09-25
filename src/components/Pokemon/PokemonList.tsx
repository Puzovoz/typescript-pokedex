import React, { useState, useEffect } from 'react';
import Pokemon from './Pokemon';
import PokemonListService from './PokemonListService';
import { PokemonResults, ILink } from '../../models/IPokemon';
import './PokemonList.css';

const PokemonList = (input: { input: string }) => {
  const [loadedPokemon, setLoadedPokemon] = useState<PokemonResults>();
  const [filteredPokemon, setFilteredPokemon] = useState<ILink[]>();
  const [renderedPokemon, setRenderedPokemon] = useState<ILink[]>();
  const [offset, setOffset] = useState<number>(50);

  const handleScroll = () =>  {
    if (document.documentElement.clientHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
    const rowSize = calculateRowSize()
    setOffset(offset => offset + (rowSize - offset % rowSize) % rowSize + rowSize * 6);    
  };

  const calculateRowSize = () => {
    return Math.floor(document.documentElement.clientWidth * 0.8 / 140)
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await PokemonListService(0, 807)
      setLoadedPokemon(result)
      setFilteredPokemon(result.results)

      const currentLoadedPokemon = 6 * calculateRowSize()
      setRenderedPokemon(result.results.slice(0, currentLoadedPokemon))
      setOffset(currentLoadedPokemon)
    }
    fetchData();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    const filtered = loadedPokemon && loadedPokemon.results.filter(pokemon => pokemon.name.includes(input.input.toLowerCase()))
    setFilteredPokemon(filtered)
    filtered && setRenderedPokemon(filtered.slice(0, offset));
  }, [input])

  useEffect(() => {
    filteredPokemon && setRenderedPokemon(filteredPokemon.slice(0, offset));
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
