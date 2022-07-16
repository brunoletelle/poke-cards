import {useContext, useEffect, useState} from "react"
import { Context } from "../Context"
import "../styles/components/Battleground.scss"
import { nanoid } from "nanoid"
import attack from "../functions/attack"

export default function Battleground(){

    const {userTeam, generateTeam, generateAdvTeam, cpuTeam} = useContext(Context)
    const [isSelected, setIsSelected] = useState(0)
    const [currentAdv, setCurrentAdv] = useState(0)

    const battleTeam = [...userTeam]

    const userHp = [userTeam[0]]

    function getFullHp(){

    }
    
    useEffect(() => {

        // ESTO VA A TRAER UN ERROR POR EL LENGTH        
      if(userTeam.length < 3){
         for(let i = 0 ; i < 3 ; i++){
            generateTeam()
         }
      }
      generateAdvTeam()
    }, [])

    function hpBar(fullHp,leftHp){
      const lifeLeft = Math.floor((leftHp/fullHp)*100)

      return(`${lifeLeft}%`)
    }
    
    const icons = `/icons/type_icons/class_icon_`
    
    return(
      userTeam.length === 3 && cpuTeam.length === 3 ?
      <div className="main-battle">
         <div className="battle-background" style={{backgroundImage: "url(../background/gym.png)"}}>
            <img className="userPokemon-img" src={battleTeam[isSelected].imageBack} alt="pokomon selected back" />
            <div className="bench">
               {battleTeam.map( (pokemon, index) => ( 
                  <img className="benchPokemon-img" key={nanoid()} onClick={() => setIsSelected(index)} src={pokemon.imageFront} alt="pokomon selected back" />
               ))}
            </div>
            <img className="pcPokemon-img" src={cpuTeam[1].imageFront} alt="pokomon selected front" />
            <div className="selected-info">
               <div className="progress-bar">
                  <div style={{width: hpBar(userTeam[isSelected].stats[0].base_stat,battleTeam[isSelected].stats[0].base_stat)}}>
                     {battleTeam[isSelected].stats[0].base_stat}
                  </div>
               </div>
               <div className="moves">
                  {battleTeam[isSelected].moveArray.map( move =>
                     <div className="moves-button" onClick={() => attack(battleTeam[isSelected], cpuTeam[currentAdv], move )}>
                        <img src={icons+`${move.type.toLowerCase()}.png`} alt="move icon" />
                        <h3>{move.name}</h3>
                        <h3>{move.power}</h3>
                     </div>
                     )
                  }
               </div>

            </div>
         </div>
      </div>
      : 
      <div>
            <h2>Tu equipo no esta completo aún, debes tener selecionados 3 pokomons para iniciar la batalla</h2>
      </div>
        
    )
}