import "./Cards-actual.scss"
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
            <div key={pokemon.id}  className="card">
                <div className="card-wrap">
                    <div className="card-top">
                        {<h2 className="card-top-name">Lv.</h2>}
                        <div className="card-top-right">
                            <div className="card-top-right-hp">
                                <h4>{pokemon.stats[0].stat.name.toUpperCase()}</h4>
                                <h2>{pokemon.stats[0].base_stat}</h2>
                            </div>
                            {pokemon.type.map(typ => (<img className="card-top-right-type-img" src={icons+`${typ.type.name}.png`} alt="type icon"/>))}
                        </div>
                    </div>
                    <div className="card-image-container" style={{backgroundImage: `url(${pokemon.background})`}}>
                        <img className="card-image" src={pokemon.imageFront} alt="imagen de pokemon"/>
                    </div>
                    {pokemon.moveArray.map(move => (
                        <div key={move.id} className="card-move">
                            <div className="card-move-head">
                                <div className="card-move-head-text">
                                    <h3 className="card-move-head-text-name">{move.name}</h3>
                                    <h3 className="card-move-head-text-power">{move.power}</h3>
                                </div>
                                <div className="card-move-head-type">
                                    <img className="card-move-head-type-img" src={icons+`${move.type.toLowerCase()}.png`} alt="Move Type Icon" />
                                </div>
                            </div>
                            <div className="card-move-buttons">
                                <button>{move.classDamage} Attack</button>
                                <button>Move Description</button>
                            </div>
                        </div>
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