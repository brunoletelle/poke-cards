import {useState, useEffect} from "react"
import "./Home.scss"
import NavBar from "./nav-bar"
import image from "./poke-logo2.png"
import egg from "./poke-egg.png"
import Card from "./Cards-actual"

export default function Home(){

    const [show, setShow] = useState(false)

    function handleOnClick(){

        setShow(true)
    }

    return(
        <div>
            <div className="home" style={{backgroundImage: "url(../background/background-2.jpg)"}}>
                <div className="home-welcome">
                        <h1>Bienvenido entrenador!</h1>
                    <div className="home-welcome-desc">
                        <p>
                            <h3>En este lugar vas a poder generar tu propio equipo de Pokomones</h3>
                            <h3>Vas a poder utilizarlos para combatir en la zona de batalla, y juntar monedas para conseguir nuevos</h3>
                            <h3>Pokomones en el Market</h3>
                        </p>
                    </div>
                    <h2>Presionando el siguiente botón vas a conocerlos!</h2>
                    <button onClick={handleOnClick}>Encontrar Equipo</button>
                </div>
            { show ?    
                <div className="card-list">
                    <Card className="card"/>
                    <Card className="card"/>
                    <Card className="card"/>
                </div>
                :
                <div></div>
            }
            </div>
        </div>
    )
}


