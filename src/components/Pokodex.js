import {useContext} from "react"
import "../styles/components/Pokodex.scss"
import Card from "./Cards-actual"
import { Context } from "../Context"
import { nanoid } from "nanoid"

export default function Team(){

    const {userPokomons, userTeam, setUserTeam} = useContext(Context)

    //Selector de pokomones 

    function selectPokomon(pokomon){
        if(userTeam.some(team => team.id === pokomon.id)){
            setUserTeam (prevUserTeam => prevUserTeam.filter(team => team.id !== pokomon.id))
        } else if(userTeam.length < 3){
            setUserTeam(prevUserTeam => [...prevUserTeam,pokomon])
        }
    }

    

    return(
        <div className="main-team">
            {
            userPokomons.map(pokomon => (
                <div key={nanoid()} id={pokomon.id} className={userTeam.some(poke => poke.id === pokomon.id) ? "poke-container poke-selected" : "poke-container"} >
                    <Card pokemon={pokomon} selectPokomon={() => selectPokomon(pokomon)}/>
                </div>
                ))
            }            
            
        </div>
    )
}

//style={{backgroundImage: "url(../background/background-team.png)"}}