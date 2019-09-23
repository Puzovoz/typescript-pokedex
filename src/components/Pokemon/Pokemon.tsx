import React, { useState, useEffect } from 'react';
import PokemonService from './PokemonService';
import { ILink, IPokemon } from '../../models/IPokemon';
import './Pokemon.css';

const Pokemon = (props: ILink) => {
  const [pokemon, setPokemon] = useState<IPokemon>();

  useEffect(() => {
    const fetchData = async () => {
      const result = await PokemonService(props.url)
      setPokemon(result)
    }
    fetchData();
  }, [])

  return (
  	<div className="Pokemon">
      {pokemon ?
        <div key={props.name}>
          <div className="Pokemon-image"><img width="96px" height="96px" src={pokemon.sprites.front_default} /></div>
          <div className="Pokemon-index">#{('00' + pokemon.id.toString()).slice(-3)}</div>
          <div className="Pokemon-name">{
            ["-f", "-m", "-o"].includes(pokemon.species.name.substr(-2, 2)) ?
            pokemon.species.name.replace('-m', '♂').replace('-f', '♀') :
            pokemon.species.name
              .replace('tapu-', 'tapu ')
              .replace('mr-', 'mr. ')
              .replace('type-', 'type: ')
          }
          </div>
        </div> :

        <div>
          <div className="Loading-image" />
          <div className="Loading-index" />
          <div className="Loading-name" />
        </div>
      }
    </div>
  );
};

export default Pokemon;