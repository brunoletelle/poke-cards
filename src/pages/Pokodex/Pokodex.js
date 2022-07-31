import {useContext, useState,  useEffect} from "react"
import "./styles/Pokodex.scss"
import Card from "../../components/Cards/Cards-actual"
import { Context } from "../../Context"
import { nanoid } from "nanoid"
import cardOrder from "./functions/cardOrder"


export default function Pokodex(){
    const {userPokomons, userTeam, setUserTeam, inBattle, generateTeam} = useContext(Context)
    
    const [order, setOrder] = useState("Nombre")
    const [filter,setFilter] = useState("Todos")
    const [ poke, setPoke] = useState(userPokomons)
    
    //Se genera un equipo si no se genero en el inicio
    useEffect(() =>{
        generateTeam()
        
    },[])

    useEffect(() =>{
        setPoke(userPokomons)

    }, [userPokomons])
    
    //Selector de pokomones 
    
    function selectPokomon(pokomon){
        if(userTeam.some(team => team.id === pokomon.id)){
            setUserTeam (prevUserTeam => prevUserTeam.filter(team => team.id !== pokomon.id))
        } else if(userTeam.length < 3){
            setUserTeam(prevUserTeam => [...prevUserTeam,pokomon])
        }
    }
    
    //---------------- Ordenar Cartas ------------//
    function handleOrder(event){
        setOrder(event.target.value)
        setPoke(prevPokomons => cardOrder(prevPokomons,event.target.value))
        
    }
    
    const orderVar = ["Nombre","Tipo","Nivel","DV"]
    
    //--------------- FILTRAR CARTAS ---------------//
    function handleFilter(event){
        setFilter(event.target.value)
        setPoke(() => cardFilter(userPokomons, event.target.value))
    }
    
    const filterVar = ["Todos","Equipados","Bronze","Silver","Gold","Perl"]
    
    function cardFilter(pokomons, value){
        switch(value){
            case "Normal":
                return(pokomons.filter(pokomon => pokomon.DV <= 8))
            case "Bronze":
                return(pokomons.filter(pokomon => pokomon.DV <=10 && pokomon.DV > 8))
            case "Silver":
                return(pokomons.filter(pokomon => pokomon.DV <=12 && pokomon.DV >= 11))
            case "Gold":
                return(pokomons.filter(pokomon => pokomon.DV <= 14 && pokomon.DV >= 13))
            case "Perl":
                return(pokomons.filter(pokomon => pokomon.DV === 15))
            case "Equipados":
                return(pokomons.filter(pokomon => userTeam.some(teamPoko => teamPoko.id === pokomon.id)))
            case "Todos":
                return(pokomons)
            default:
                return(pokomons)
        }
    }
    


    return(
        <div className="main-pokodex" style={{backgroundImage: "url(../background/background-pokodex.png)"}}>
        {!inBattle&&         
            <div className="sort-menu">
                <div className="sort-menu-order-filter">
                    <h3>Ordenar Cartas</h3>
                    <form>
                        {orderVar.map(oVar => 
                            <label key={nanoid()}>
                                <input type="radio" value={oVar} checked={order === oVar} onChange={(event) => handleOrder(event)}/>
                                {oVar}
                            </label>
                            )}
                    </form>
                </div>
                <div className="sort-menu-order-filter">
                    <h3>Filtrar Cartas</h3>
                    <form>
                        {filterVar.map(filVar => 
                            <label key={nanoid()}>
                                <input type="radio" value={filVar} checked={filter === filVar} onChange={(event) => handleFilter(event)}/>
                                {filVar}
                            </label>
                            )}
                    </form>
                </div>
                
            </div>
        }
        {inBattle ?
            <div className="warning-battle-pokodex">
                <h3>Durante la batalla no puedes cambiar tu equipo</h3>
            </div>
            :
            <div className="pokodex-cards">
                {
                poke.map(pokomon => (
                    <div key={nanoid()} id={pokomon.id} className={userTeam.some(poke => poke.id === pokomon.id) ? "poke-container poke-selected" : "poke-container"} >
                        <Card pokemon={pokomon} selectPokomon={() => selectPokomon(pokomon)}/>
                    </div>
                ))
                }
            </div>
        }   
        </div>
    )
}

//style={{backgroundImage: "url(../background/background-team.png)"}}