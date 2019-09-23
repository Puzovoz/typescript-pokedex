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
    pokemon && pokemon.species.name.replace('-m', '♂') && pokemon.species.name.replace('-f', '♀');
  }, [])

  return (
  	<div className="Pokemon">
      {pokemon ?
        <div key={props.name}>
          <img src={pokemon.sprites.front_default} />
          <div className="Pokemon-index">#{('00' + pokemon.id.toString()).slice(-3)}</div>
          <div className="Pokemon-name">{
            (pokemon.species.name.charAt(0).toUpperCase()
             +pokemon.species.name.slice(1)).replace('-m', '♂').replace('-f', '♀')
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