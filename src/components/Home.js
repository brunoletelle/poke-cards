import {useContext, useEffect} from "react"
import "../styles/components/Home.scss"
import Card from "./Cards-actual"
import { Context } from "../Context"

export default function Home(){

    const {generateTeam, userTeam} = useContext(Context)
    
    useEffect(() => {
        if(userTeam.length < 3){
            for(let i = 0 ; i < 3 ; i++){
                generateTeam()
            }
        }
    }, []) 

    return(
        <div>
            <div className="home" style={{backgroundImage: "url(../background/background-2.jpg)"}}>
                <div className="home-welcome">
                        <h1>Bienvenido entrenador!</h1>
                    <div className="home-welcome-desc">
                        <h3>En este lugar vas a poder generar tu propio equipo de Pokomones</h3>
                        <h3>Vas a poder utilizarlos para combatir en la zona de batalla, y juntar monedas para conseguir nuevos</h3>
                        <h3>Pokomones en el Market</h3>
                    </div>
                    <h2>Conoce a tu equipo</h2>
                </div>
                <div className="card-list">
                {userTeam.map(pokomon => (
                    <Card key={pokomon.id} className="card" pokemon={pokomon ? pokomon : "wait"}/>
                        ))
                }
                </div>
            </div>
        </div>
    )
}


