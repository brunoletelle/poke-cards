import {useState, createContext} from "react"
import pokeGenerator from "./poke-gen-final"

const Context = createContext()

function ContextProvider({children}){

    const [userPokomons, setUserPokomons] = useState([])
    const [userTeam, setUserTeam] = useState([])
    const [pokoMarket, setPokoMarket] = useState([])

    function generateTeam(){
        if(userPokomons.length <3){
            pokeGenerator().then(poke => {
                setUserPokomons(prevPokomon => [...prevPokomon,poke])
                setUserTeam(prevPokomon => [...prevPokomon,poke])
            })
        }
    }

    function generateMarket(){
        if(pokoMarket.length < 20){
            pokeGenerator().then(poke => {
                setPokoMarket(prevMarket => [...prevMarket,poke])
            })
        }
    }

    return(
        <Context.Provider value={{userPokomons, userTeam, setUserTeam, generateTeam, generateMarket, pokoMarket, setPokoMarket}}>
            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}