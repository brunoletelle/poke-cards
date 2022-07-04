import {useState, useEffect, useContext} from "react"
import "../styles/components/Home.scss"
import Card from "./Cards-actual"
import { Context } from "../Context"

export default function Home(){

    const {generatePokemon, userPokomons} = useContext(Context)

    function handleOnClick(){
        generatePokemon()
        generatePokemon()
        generatePokemon()
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
                    <button onClick={handleOnClick}>Mostrar Mi Equipo</button>
                </div>
                <div className="card-list">
                    <Card className="card" pokemon={userPokomons[0] ? userPokomons[0] : "wait"}/>
                    <Card className="card" pokemon={userPokomons[1] ? userPokomons[1] : "wait"}/>
                    <Card className="card" pokemon={userPokomons[2] ? userPokomons[2] : "wait"}/>
                </div>
                
            </div>
        </div>
    )
}


