import { PokemonResults } from '../../models/IPokemon';
import axios from 'axios';

const PokemonListService = async (offset: number, limit: number): Promise<PokemonResults> => {
  const result =
    await axios
      .get('https://pokeapi.co/api/v2/pokemon/?offset='+offset+'&limit='+limit)

  return {
  	count: result.data.count,
  	results: result.data.results
  };
};

export default PokemonListService;