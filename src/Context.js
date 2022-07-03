import React from "react"
import pokeGenerator from "./poke-gen-final"

const Context = React.createContext()

function ContextProvider({children}){

    const [pokomon, setPokomon] = React.useState([])
    const [show, setShow] = React.useState(false)

    function generatePokemon(){
        if(pokomon.length <3){
            pokeGenerator().then(poke => {
                setPokomon(prevPokomon => [...prevPokomon,poke])
            })
        }
        
    }

    React.useEffect(() => {
        if(pokomon.length === 3 ){
            setShow(true)
        }
    },[pokomon])
    

    return(
        <Context.Provider value={{pokomon, generatePokemon, show}}>
            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}