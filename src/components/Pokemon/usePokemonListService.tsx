import { useEffect, useState } from 'react';
import { Service } from '../Service/Service';
import { PokemonResults } from './PokemonList';

const usePokemonListService = (offset: number, limit: number) => {
  const [result, setResult] = useState<Service<PokemonResults>>({
    status: 'loading'
  });

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/?offset='+offset+'&limit='+limit)
      .then(response => response.json())
      .then(response => setResult({ status: 'loaded', payload: response }))
      .catch(error => setResult({ status: 'error', error }));
  }, []);

  return result;
};

export default usePokemonListService;