import React, {useState} from 'react';
import './Modal.css';
import star from './Star.png';
import { IPokemon } from '../../models/IPokemon';

const Modal = (pokemon: IPokemon) => {
  const [show, setShow] = useState<boolean>(false);
  const [shiny, setShiny] = useState<boolean>(false);

  const handleToggle = () => {
  	setShiny(!shiny)
  }

  return (
    <div className="Modal">
      <div className="Modal-images">{shiny ?
      	<>
          <img className="Sprite" src={pokemon.sprites.front_shiny} />
          {pokemon.sprites.back_shiny && <img className="Sprite" src={pokemon.sprites.back_shiny} />}
        </> :
        <>
          <img className="Sprite" src={pokemon.sprites.front_default} />
          {pokemon.sprites.back_default && <img className="Sprite" src={pokemon.sprites.back_default} />}
        </>
      }
      </div>
      <div className="Info">
        <div style={{fontWeight: "bold", textAlign: "center"}}>{["-f", "-m", "-o"].includes(pokemon.species.name.substr(-2, 2)) ?
              pokemon.species.name.replace('-m', '♂').replace('-f', '♀') :
              pokemon.species.name
                .replace('tapu-', 'tapu ')
                .replace('mr-', 'mr. ')
                .replace('type-', 'type: ')
                .replace('-z', '-Z')
        }
        <img className="Star" src={star} onClick={event => handleToggle()}/><br />

        {pokemon.types[1] ?
          <>
            <div className="Type-name" id={pokemon.types[1].type.name}>{pokemon.types[1].type.name}</div>
            {" · "}
            <div className="Type-name" id={pokemon.types[0].type.name}>{pokemon.types[0].type.name}</div>
          </> :
          <div className="Type-name" id={pokemon.types[0].type.name}>{pokemon.types[0].type.name}</div>
        }
        </div>

        <>
          <div style={{fontWeight: "bold", marginBottom: "-2px"}}>Abilities:</div>
          {pokemon.abilities.map(ability => (
            <div className="Ability">{ability.ability.name}</div>
          ))}
        </>

        <table style={{marginTop: "5px"}}>
          {pokemon.stats.map(stat => (
          	<tr style={{lineHeight: "5px"}}>
              <td style={{textAlign: "right"}}>{stat.stat.name.replace('special-', 'Sp. ')} {stat.base_stat}</td>
              <td><div className="Stat" style={{width: stat.base_stat}} /></td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  )
}

export default Modal;