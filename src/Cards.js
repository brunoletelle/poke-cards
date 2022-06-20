import React from "react"
import pokeGenerator from "./poke-gen-final"

export default function Cards(){

    const [isGen, setIsGen] = React.useState(false)
    const [pokemon, setPokemon] = React.useState([])
    

    React.useEffect(() => {
        generate()
    },[])
    
    function generate(){
        for(let i=0; i < 3; i++){
            pokeGenerator().then(poke => {
                setPokemon(prevPokemon => [...prevPokemon, poke])
                if( i === 2) {
                    setIsGen(true)}
            })
        }
    }

    //console.log(team[0].name)

    if(isGen){
    return (
    <div>
        <h2>Pokemon 1: {pokemon[0].name}</h2>
        <h2>Pokemon 2: {pokemon[1].name}</h2>
        <h2>Pokemon 3: {pokemon[2].name}</h2>
    </div>
    ) 
    }else return (
        <div>
            <h1>Cargando...</h1>
        </div>)
    /* 
    setTimeout(() => {
    console.log("esto es pokemon ",pokemon.name)

    setImagenUrl(() => (pokemon.imagenFront))
    
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
    )},6000) */
}