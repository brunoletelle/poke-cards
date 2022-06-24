import "./Cards-pixels.scss"
import React from "react"
import pokeGenerator from "./poke-gen-final"
import { type } from "@testing-library/user-event/dist/type"

export default function Cards(){

    const [isGen, setIsGen] = React.useState(false)
    const [pokemon, setPokemon] = React.useState([])
    
    const icons = `/icons/type_icons/class_icon_`
    
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
        <div>
        { pokemon.map( pokemon => (
            <div key={pokemon.id}  className="poke">
                <div className="card-wrap">
                    <div className="card-top">
                        <h2 className="card-top-name">{pokemon.name}</h2>
                        <div className="card-top-right">
                            {pokemon.type.map(typ => (<img className="card-top-right-type-img" src={icons+`${typ.type.name}.png`} alt="type icon"/>))}
                            <div className="card-top-right-hp">
                                <h4>{pokemon.stats[0].stat.name.toUpperCase()}</h4>
                                <h2>{pokemon.stats[0].base_stat}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="card-image-container">
                        <img className="card-image" src={pokemon.imageFront} alt="imagen de pokemon"/>
                    </div>
                    {pokemon.moveArray.map(move => (
                        <div key={move.id} className="card-move">
                            <div className="card-move-head">
                                <div className="card-move-head-text">
                                    <h3 className="card-move-name">{move.name}</h3>
                                    <h3 className="card-move-power">{move.power}</h3>
                                </div>
                                <div className="card-move-type">
                                    <h4 className="card-move-type-text">{move.type}</h4>
                                </div>
                            </div>
                            <div className="card-move-buttons">
                                <button>{move.classDamage} Attack</button>
                                <button>Move Description</button>
                            </div>
                        </div>
                    ))}
                </div>
                <div>
                    {pokemon.stats.map(statt => (
                            <h5>{statt.base_stat} {statt.stat.name}</h5>
                    ))}
                </div>
            </div>
        ))}
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