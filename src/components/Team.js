import {useContext} from "react"
import "../styles/components/Team.scss"
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
        <div className="main">
            {
            userPokomons.map(pokomon => (
                <div key={nanoid()} id={pokomon.id} className={userTeam.some(poke => poke.id === pokomon.id) ? "poke-selected" : "poke-container"} >
                    <Card pokemon={pokomon} selectPokomon={() => selectPokomon(pokomon)}/>
                </div>
                ))
            }
            
            {/* 
                userPokomons.map(pokomon => { return(
                    <div className="poke-container">
                        <Card pokemon={pokomon} />
                        <div className="info-container">
                            <div className="info-description">
                                <h2 className="parrafo">{pokomon.description.tittle}</h2>
                                <h3 className="parrafo">{pokomon.description.body}</h3>
                            </div>
                            <div className="info-moves">
                            </div>
                        </div>  
                    </div>)
                })
                 */}
            
            
        </div>
    )
}

//style={{backgroundImage: "url(../background/background-team.png)"}}