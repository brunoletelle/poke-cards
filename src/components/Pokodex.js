import {useContext} from "react"
import "../styles/components/Pokodex.scss"
import Card from "./Cards-actual"
import { Context } from "../Context"
import { nanoid } from "nanoid"

export default function Team(){

    const {userPokomons, userTeam, setUserTeam, inBattle} = useContext(Context)

    //Selector de pokomones 

    function selectPokomon(pokomon){
        if(userTeam.some(team => team.id === pokomon.id)){
            setUserTeam (prevUserTeam => prevUserTeam.filter(team => team.id !== pokomon.id))
        } else if(userTeam.length < 3){
            setUserTeam(prevUserTeam => [...prevUserTeam,pokomon])
        }
    }

    const poke = userPokomons.sort(function (a, b) {
        if (a.type[0].type.name > b.type[0].type.name) {
          return 1;
        }
        if (a.type[0].type.name < b.type[0].type.name) {
          return -1;
        }
        return 0;
      })

    

    return(
        <div className="main-pokodex" style={{backgroundImage: "url(../background/background-pokodex.png)"}}>
        {!inBattle&&         
            <div className="sort-menu">
                <h4>Hola soy un menu</h4>
            </div>
        }
        {inBattle ?
            <div className="warning-battle-pokodex">
                <h3>Durante la batalla no puedes cambiar tu equipo</h3>
            </div>
            :
            <div className="pokodex-cards">
                {
                poke.map(pokomon => (
                    <div key={nanoid()} id={pokomon.id} className={userTeam.some(poke => poke.id === pokomon.id) ? "poke-container poke-selected" : "poke-container"} >
                        <Card pokemon={pokomon} selectPokomon={() => selectPokomon(pokomon)}/>
                    </div>
                ))
                }
            </div>
        }   
        </div>
    )
}

//style={{backgroundImage: "url(../background/background-team.png)"}}