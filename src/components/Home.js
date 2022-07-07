import {useContext, useState} from "react"
import "../styles/components/Home.scss"
import Card from "./Cards-actual"
import { Context } from "../Context"
import { nanoid } from "nanoid"

export default function Home(){

    const {generateTeam, userTeam} = useContext(Context)

    const [offBtn, setOffBtn] = useState(false)

    function handleOnClick(){
        for(let i = 0; i < 3 ; i++){
            generateTeam()
        }
        setOffBtn(true)
    }

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
                    <button disabled={offBtn} onClick={handleOnClick}>{offBtn ? "Equipo Seleccionado" : "Mostrar Mi Equipo"}</button>
                </div>
                
                <div className="card-list">
                {userTeam.map(pokomon => {return(
                        <Card key={pokomon.id} className="card" pokemon={pokomon ? pokomon : "wait"}/>
                        
                        )})
                }
                </div>
            </div>
        </div>
    )
}


