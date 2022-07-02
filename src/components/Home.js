import {useState, useEffect} from "react"
import "./Home.scss"
import NavBar from "./nav-bar"
import image from "./poke-logo.png"
import egg from "./poke-egg.png"
import Card from "./Cards-actual"

export default function Home(){

    const [show, setShow] = useState(false)

    function handleOnClick(){
        setShow(true)
    }

    return(
        <div className="index">
            <div className="index-top">
                <img src={image} alt="Imagen de logo pokemon"/>
            </div>
            <NavBar />
            <div className="home" >
                <div className="home-welcome">
                    <h1>Bienvenido entrenador</h1>
                    <h2>En este lugar vas a poder generar tu propio equipo de Pokemones </h2>
                    <h3>Pulsando el siguiente botón vas a conocerlos!</h3>
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


