import '../styles/components/Market.scss'

import {useEffect, useContext} from "react"
import { Context } from '../Context'
import Card from './Cards-actual'
import Pack from "./Pack"


export default function Market(){

    const {cardPack, generateCardPack} = useContext(Context)

    const pokoDV = "bronze"

    useEffect(() => {

        const pack = cardPack.find( card => card.name === pokoDV )
        
        if(pack.name === pokoDV){
            if(pack.cards.length < 5){
                for(let i = 0 ; i < 5 ; i++){
                    generateCardPack(pokoDV)
                }
            }
        }

    }, []) 

    // MOSTRAR CARTAS DEL PACK

    const pack = cardPack.find( card => card.name === pokoDV )
        
    const showCard = pack.cards.map(pokomon =>{ 
        console.log(pokomon.name)
        return(
        <div className="product" key={pokomon.id}>
            <div className='product-image'>
                <Card  pokemon={pokomon ? pokomon : "wait"}/>
            </div>
            <button className='product-button'>Comprar</button>
        </div>
        )
    })
    
    return(
        <div className='main'>

            <Pack />
            <Pack />
        </div>
    )
}