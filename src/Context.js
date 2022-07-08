import {useState, createContext} from "react"
import pokeGenerator from "./poke-gen-final"

const Context = createContext()

function ContextProvider({children}){

    const [userPokomons, setUserPokomons] = useState([])
    const [userTeam, setUserTeam] = useState([])
    const [pokoMarket, setPokoMarket] = useState([])
    const [cardPack, setCardPack] = useState([ {
                                                    name: "bronze",
                                                    cards: [] 
                                                },
                                                {
                                                    name: "silver",
                                                    cards: [] 
                                                },
                                                {
                                                    name: "gold",
                                                    cards: [] 
                                                },
                                                {
                                                    name: "platinum",
                                                    cards: [] 
                                                },
                                            ])

    function generateTeam(){
        if(userPokomons.length <3){
            pokeGenerator(5,12).then(poke => {
                setUserPokomons(prevPokomon => [...prevPokomon,poke])
                setUserTeam(prevPokomon => [...prevPokomon,poke])
            })
        }
    }
/* 
    function generateMarket(){
        if(pokoMarket.length < 20){
            pokeGenerator(9,15).then(poke => {
                setPokoMarket(prevMarket => [...prevMarket,poke])
            })
        }
    }
 */
    //GENERADOR DE PACK DE CARTAS

    function generateCardPack(cardDV){

        let minDV = 0;
        let maxDV = 0;
        let size = 0;

        if(cardDV === "bronze"){
            minDV = 9
            maxDV = 10
            size = 8
        } else if(cardDV === "silver"){
            minDV = 11
            maxDV = 12
            size = 5
        } else if(cardDV === "gold"){
            minDV = 13
            maxDV = 14
            size = 3
        } else if(cardDV === "platinum"){
            minDV = 15
            maxDV = 15
            size = 1
        } 

        const pack = cardPack.find( card => card.name === cardDV )
                           
        if(pack.cards.length < size){                          // SI EL PACK TIENE MENOS DE 5 CARTAS
            pokeGenerator(minDV, maxDV).then(poke => {      
                setCardPack((prevPack) => {
                    const newPack = prevPack.map(pac => {
                        if(pac.name === cardDV){
                            return ({ name: pac.name,
                                        cards: [...pac.cards,poke]  
                            })
                        } else return pac
                    })
                    
                    return(newPack)
                })
            })
        }
        
        


    }

    return(
        <Context.Provider value={{userPokomons, userTeam, setUserTeam, generateTeam, cardPack, generateCardPack, pokoMarket, setPokoMarket}}>
            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}