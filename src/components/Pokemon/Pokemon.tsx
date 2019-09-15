import React from 'react';
import usePokemonService from './usePokemonService';
import { PokemonResult } from './PokemonList';
import './Pokemon.css';

const Pokemon = (props: PokemonResult) => {
  const service = usePokemonService(props.url)
  return (
  	<div className="Pokemon">
      {service.status === 'loading' &&
        <div>
          <div className="Loading-image" />
          <div className="Loading-index" />
          <div className="Loading-name" />
        </div>
      }
      {service.status === 'loaded' &&
        <div key={props.name}>
          <img src={service.payload.sprites.front_default} />
          <div className="Pokemon-index">#{('00' + service.payload.id.toString()).slice(-3)}</div>
          <div className="Pokemon-name">
            {service.payload.species.name.charAt(0).toUpperCase()
          	+service.payload.species.name.slice(1)}
          </div>
        </div>
      }
      {service.status === 'error' && (
      	<div>Error</div>
      )}
    </div>
  );
};

export default Pokemon;