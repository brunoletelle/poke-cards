import "./Cards.scss"
import React from "react"
import pokeGenerator from "./poke-gen-final"

export default function Cards(){

    const [isGen, setIsGen] = React.useState(false)
    const [pokemon, setPokemon] = React.useState([])
    
    
    React.useEffect(() => {
        if(pokemon.length === 0){
            generate()
        }
        if(pokemon.length === 3){
            setIsGen(true)
        }
    },[pokemon.length])
    
    function generate(){
        for(let i=0; i < 3; i++){
            pokeGenerator().then(poke => {
                setPokemon(prevPokemon => [...prevPokemon, poke])
            })
        }
    }


    if(isGen){
    return (
        <div>{ pokemon.map( pokemon => (
            <div className="poke">
            <div key={pokemon.id} className="card-wrap">
                <div className="card-top">
                    <h2 className="card-top-name">{pokemon.name}</h2>
                    <div className="card-top-hp">
                        <h4>{pokemon.stats[0].stat.name.toUpperCase()}</h4>
                        <h2>{pokemon.stats[0].base_stat}</h2>
                    </div>
                </div>
                    <div className="card-image-container">
                        <img className="card-image" src={pokemon.imageFront} alt="imagen de pokemon"/>
                    </div>
                <div className="card-physical">
                    <div className="card-physical-head">
                        <div className="card-physical-type">
                            <h4 className="card-physical-type-text">{pokemon.physicalMove[0].type}</h4>
                        </div>
                        <div className="card-physical-head-text">
                            <h3 className="card-physical-name">{pokemon.physicalMove[0].name}</h3>
                            <h3 className="card-physical-power">{pokemon.physicalMove[0].power}</h3>
                        </div>
                    </div>
                    <div className="card-physical-button">
                        <button>Physic Attack</button>
                    </div>
                </div>
                <h5>Movimiento especial1: {pokemon.specialMove[0].name}</h5>
                <h5>Movimiento especial2: {pokemon.specialMove[1].name}</h5>
            </div>
                <div>
                    {pokemon.stats.map(statt => (
                            <h5>{statt.base_stat} {statt.stat.name}</h5>
                    ))}
                </div>
            </div>
        ))
        }

        </div>
    ) 
    }else return (
        <div>
            <h1>Cargando...</h1>
        </div>)
    /* 
    [...pokemon.physicalMove,
        {   name: moveName,
            description: data.effect_entries[0].effect,
            precision: data.accuracy,
            power: data.power,
            type: data.type.name,
            classDamage: data.damage_class.name,
        }]
         */
}