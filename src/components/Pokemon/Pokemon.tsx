import React, { useState, useEffect } from 'react';
import PokemonService from './PokemonService';
import Modal from './Modal';
import { ILink, IPokemon } from '../../models/IPokemon';
import './Pokemon.css';

const Pokemon = (props: ILink) => {
  const [pokemon, setPokemon] = useState<IPokemon>();
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleModal = (event: React.MouseEvent) => {
    setShowModal(true)

  }

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
          <div className="Pokemon-name" onClick={event => handleModal(event)}>{
            ["-f", "-m", "-o"].includes(pokemon.species.name.substr(-2, 2)) ?
            pokemon.species.name.replace('-m', '♂').replace('-f', '♀') :
            pokemon.species.name
              .replace('tapu-', 'tapu ')
              .replace('mr-', 'mr. ')
              .replace('type-', 'type: ')
              .replace('-z', '-Z')
          }
          </div>
          { showModal ?
            <>
              <div className="Modal-background" onClick={event => setShowModal(false)} />
              <Modal {...pokemon} />
            </> :
            null
          }     
          { pokemon.types[1] ?
            <>
              <div className="Type-name" id={pokemon.types[1].type.name}>{pokemon.types[1].type.name}</div>
              {" · "}
              <div className="Type-name" id={pokemon.types[0].type.name}>{pokemon.types[0].type.name}</div>
            </> :
            <div className="Type-name" id={pokemon.types[0].type.name}>{pokemon.types[0].type.name}</div>
          }
        </div> :

        <div>
          <div className="Loading-image" /><br />
          <div className="Loading-index" /><br />
          <div className="Loading-name" />
        </div>
      }
    </div>
  );
};

export default Pokemon;