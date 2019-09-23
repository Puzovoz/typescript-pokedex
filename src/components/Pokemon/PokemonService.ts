import { IPokemon } from '../../models/IPokemon';
import axios from 'axios';

const PokemonService = async (url: string): Promise<IPokemon> => {
  const result =
    await axios
      .get(url)

  return {
    abilities: result.data.abilities,
    base_experience: result.data.base_experience,
    forms: result.data.forms,
    game_indices: result.data.game_indices,
    height: result.data.height,
    held_items: result.data.held_items,
    id: result.data.id,
    is_default: result.data.is_default,
    location_area_encounters: result.data.location_area_encounters,
    moves: result.data.moves,
    order: result.data.order,
    species: result.data.species,
    sprites: result.data.sprites,
    stats: result.data.stats,
    types: result.data.types,
  };
};

export default PokemonService;