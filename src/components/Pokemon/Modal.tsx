import React, {useState} from 'react';
import './Modal.css';
import star from './Star.png';
import { IPokemon } from '../../models/IPokemon';

const Modal = (pokemon: IPokemon) => {
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

        <table>
          {pokemon.stats.reverse().map(stat => (
          	<tr style={{lineHeight: "5px"}}>
             <td style={{textAlign: "right"}}>
               {stat.stat.name
                 .replace('special-a', 'SpA')
                 .replace('special-d', 'SpD')
                 .slice(0, 3)}
             </td>
             <td style={{textAlign: "right"}}>{stat.base_stat}</td>
             <td style={{width: 130}}>
               <div className="Stat" style={{width: `${(stat.base_stat/255)**(1/2)*100}%`,
                                             background: `hsl(${stat.base_stat*0.7},100%,50%)`}} />
             </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  )
}

export default Modal;