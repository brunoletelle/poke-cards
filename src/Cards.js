import React from "react"
import pokeGenerator from "./poke-genV3"

export default function Cards(props){

    const [imagenUrl, setImagenUrl] = React.useState("")
    const [pokemon1, setPokemon1] = React.useState({})
    const [pokemon2, setPokemon2] = React.useState({})
    const [pokemon3, setPokemon3] = React.useState({})
    const [isGen, setIsGen] = React.useState(false)
    
    React.useEffect(() => {
        setPokemon1(generate())
        setPokemon2(generate())
        setPokemon3(generate())
        async function generate(){
            const pokemon = await pokeGenerator()
            console.log(await pokemon)
            if(pokemon1.name&&pokemon2.name&&pokemon3.name){
                setIsGen(true)
            }
            return pokemon
        }
    },[])

    console.log("is not gen")

        //console.log(pokemon1.name)
        
    if(pokemon1.name && pokemon2.name && pokemon3.name){
    return (
    <div>
        <h2>Holis1: {pokemon1.name}</h2>
        <h2>Holis2: {pokemon2.name}</h2>
        <h2>Holis3: {pokemon3.name}</h2>
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