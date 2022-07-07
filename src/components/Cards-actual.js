import "../styles/components/Cards-actual.scss"
import {useEffect,useState, useContext} from "react"
import { nanoid } from 'nanoid'
import { Context } from "../Context"

export default function Card(props){

    const [isGen, setIsGen] = useState(true)
    const {userTeam} = useContext(Context)

    // Imagen de carga de cartas con isGen(false)
/* 
    useEffect(() => {
        if(props.pokemon.name){
            setIsGen(true)
            console.log("EFFECT: ", props.pokemon.name)
        }
    },[props.pokemon])
 */
    const pokemon = props.pokemon
    
    const icons = `/icons/type_icons/class_icon_`

    if(isGen){
        return (
            <div onClick={props.selectPokomon} className={"card"} style={{background: `${pokemon.borderColor}`}}>
                <div className="card-wrap" style={{background: `linear-gradient(210deg, ${pokemon.backgroundType[0]} 0%,${pokemon.backgroundType[0]} 80%,  ${pokemon.backgroundType[1]} 100% )`}}>
                    <div className="card-top">
                        {<h2 className="card-top-name">Lv. {pokemon.level}</h2>}
                        <div className="card-top-right">
                            <div className="card-top-right-hp">
                                <h4>{pokemon.stats[0].stat.name.toUpperCase()}</h4>
                                <h2>{pokemon.stats[0].base_stat}</h2>
                            </div>
                            {pokemon.type.map(typ => (<img key={nanoid()} className="card-top-right-type-img" src={icons+`${typ.type.name}.png`} alt="type icon"/>))}
                        </div>
                    </div>
                    <div className="card-image-container" style={{backgroundImage: `url(${pokemon.background})`}}>
                        <img className="card-image" src={pokemon.imageFront} alt="imagen de pokemon"/>
                    </div>
                    <div className="card-bottom">
                        <h3 className="card-name">{pokemon.name}</h3>
                        <hr></hr>
                    {pokemon.moveArray.map(move => (
                        <div key={nanoid()} >
                            <div className="card-move">
                                <div className="card-move-head">
                                    <div className="card-move-head-text">
                                        <h3 className="card-move-head-text-name">{move.name}</h3>
                                    </div>
                                    <div className="card-move-head-type">
                                        <h3 className="card-move-head-type-power">{move.power}</h3>
                                        <img className="card-move-head-type-img" src={icons+`${move.type.toLowerCase()}.png`} alt="Move Type Icon" />
                                    </div>
                                </div>
                            </div>
                            <hr></hr>
                        </div>
                    ))}
                    <div className="card-bottom-stats">
                    {pokemon.stats.map((stat) => {
                        return( 
                                <div key={nanoid()} className="card-bottom-stats-text">
                                    <h3>{stat.stat.name.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}</h3>
                                    <h3>{stat.levelDV_stat}</h3>
                                </div>
                                )
                            })}
                    </div>
                    </div>
                </div>
            </div>
        
        ) 
    } else return (
        <div className="card-load">
            <div className="preloader">
            </div>
        </div>
        )
    
}