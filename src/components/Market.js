import '../styles/components/Market.scss'

import {useState, useEffect, useContext} from "react"
import { Context } from '../Context'
import Card from './Cards-actual'


export default function Market(){

    const {pokoMarket, setPokoMarket, generateMarket} = useContext(Context)

    useEffect(() => {
        if(pokoMarket.length < 20){
            for(let i = 0 ; i < 20 ; i++){
                generateMarket()
            }
        }
    }, []) 
    
    return(
        <div className='main'>
            {pokoMarket.map(pokomon => {return(
                        <Card key={pokomon.id} className="card" pokemon={pokomon ? pokomon : "wait"}/>
                        
                        )})
                }
        </div>
    )
}