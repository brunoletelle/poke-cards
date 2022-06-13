import React from "react"

export default function Cards(props){

    const [imagenUrl, setImagenUrl] = React.useState("")

    fetch("https://pokeapi.co/api/v2/pokemon-form/25/")
    .then(res => res.json())
    .then(data => {
        setImagenUrl(data.sprites.front_default)
    })

    console.log("esta es la url:", imagenUrl)
    return(
        <div className="card-wrap">
            <h1>Holis soy una tarjeta</h1>
            <div className="card-image-container">
                <img className="card-image" src={imagenUrl} alt=""/>
            </div>
            <h3>Description1</h3>
            <h3>Description2</h3>
            <h3>Description3</h3>
        </div>
    )
}