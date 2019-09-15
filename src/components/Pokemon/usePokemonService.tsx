import { useEffect, useState } from 'react';
import { Service } from '../Service/Service';
import { IPokemon } from '../../models/IPokemon';

const usePokemonService = (url: string) => {
  const [result, setResult] = useState<Service<IPokemon>>({
    status: 'loading'
  });

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(response => setResult({ status: 'loaded', payload: response }))
      .catch(error => setResult({ status: 'error', error }));
  }, []);

  return result;
};

export default usePokemonService;