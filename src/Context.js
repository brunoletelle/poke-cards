import React from "react"
import pokeGenerator from "./poke-gen-final"

const Context = React.createContext()

function ContextProvider({children}){

    const [userPokomons, setUserPokomons] = React.useState([])
    const [show, setShow] = React.useState(false)

    function generatePokemon(){
        if(userPokomons.length <3){
            pokeGenerator().then(poke => {
                setUserPokomons(prevPokomon => [...prevPokomon,poke])
            })
        }
        
    }

    React.useEffect(() => {
        if(userPokomons.length === 3 ){
            setShow(true)
        }
    },[userPokomons])
    

    return(
        <Context.Provider value={{userPokomons, generatePokemon, show}}>
            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}