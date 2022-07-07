import '../styles/components/Market.scss'

import {useEffect, useContext} from "react"
import { Context } from '../Context'
import Card from './Cards-actual'


export default function Market(){

    const {pokoMarket, generateMarket} = useContext(Context)

    useEffect(() => {
        if(pokoMarket.length < 20){
            for(let i = 0 ; i < 20 ; i++){
                generateMarket()
            }
        }
    }, []) 
    
    return(
        <div className='main'>
            {pokoMarket.map(pokomon =>(
            <div className="product">
                <div key={pokomon.id} className='product-image'>
                    <Card  pokemon={pokomon ? pokomon : "wait"}/>
                </div>
                <button className='product-button'>Comprar</button>
            </div>
            ))}
        </div>
    )
}