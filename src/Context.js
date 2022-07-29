import {useState, createContext} from "react"
import pokeGenerator from "./functions/poke-gen-final"

const Context = createContext()

function ContextProvider({children}){

    const [inBattle, setInBattle] = useState(false)

    const [userPokomons, setUserPokomons] = useState([])

    const [userTeam, setUserTeam] = useState([])

    const [cpuTeam, setCpuTeam] = useState([])

    const [coins, setCoins] = useState(100)

    const [pokoMarket, setPokoMarket] = useState([])
    const [cardPack, setCardPack] = useState([ {
                                                    name: "bronze",
                                                    maxCards: 5,
                                                    price: 200,
                                                    cards: [] 
                                                },
                                                {
                                                    name: "silver",
                                                    maxCards: 4,
                                                    price: 300,
                                                    cards: [] 
                                                },
                                                {
                                                    name: "gold",
                                                    maxCards: 2,
                                                    price: 400,
                                                    cards: [] 
                                                },
                                                {
                                                    name: "perl",
                                                    maxCards: 1,
                                                    price: 500,
                                                    cards: [] 
                                                },
                                            ])

    // Genera los pokomons iniciales si se han generado anteriormente
    function generateTeam(){
        if(userPokomons.length <3){
            for(let i = 0; i < 3; i++){
                pokeGenerator(5,12).then(poke => {
                    setUserPokomons(prevPokomon => [...prevPokomon,poke])
                    setUserTeam(prevPokomon => [...prevPokomon,poke])
                })
            }
        }
    }

    // Genera un equipo rival para las batallas 
    function generateAdvTeam(regenerate){
        
        if(regenerate){
            setCpuTeam([])
        }

        if(cpuTeam.length < 3){
            for(let i = 0; i < 3; i++){
                pokeGenerator(5,15).then(poke => {
                    setCpuTeam(prevPokomon => [...prevPokomon,poke])
                })
            }
        }

    }
    
    //GENERADOR DE PACK DE CARTAS PARA MARKET

    function generateCardPack(cardDV){

        let minDV = 0;
        let maxDV = 0;
        let size = 0;

        if(cardDV === "bronze"){
            minDV = 9
            maxDV = 10
            size = 5
        } else if(cardDV === "silver"){
            minDV = 11
            maxDV = 12
            size = 4
        } else if(cardDV === "gold"){
            minDV = 13
            maxDV = 14
            size = 2
        } else if(cardDV === "perl"){
            minDV = 15
            maxDV = 15
            size = 1
        } 

        const pack = cardPack.find( card => card.name === cardDV )
                           
        if(pack.cards.length < size){     // SI EL PACK TIENE MENOS DE 5 CARTAS
            pokeGenerator(minDV, maxDV).then(poke => {      
                setCardPack((prevPack) => {
                    const newPack = prevPack.map(pac => {
                        if(pac.name === cardDV){
                            return ({ name: pac.name,
                                      maxCards: pac.maxCards,
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
        <Context.Provider value={{userPokomons, setUserPokomons, 
                                    userTeam, setUserTeam, generateTeam, 
                                    cardPack, setCardPack, generateCardPack, 
                                    pokoMarket, setPokoMarket,
                                    cpuTeam, setCpuTeam, generateAdvTeam, 
                                    inBattle, setInBattle,
                                    coins, setCoins}}>
            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}