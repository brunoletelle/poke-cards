import '../styles/components/Market.scss'

import {useEffect, useContext} from "react"
import { Context } from '../Context'
import Card from './Cards-actual'
import Pack from "./Pack"
import { nanoid } from "nanoid"


export default function Market(){

    const {cardPack, generateCardPack} = useContext(Context)

    //const pokoDV = "gold"

    const packTypes = [{type: "bronze", maxCard: 5},
                        {type: "silver", maxCard: 4},
                        {type: "gold", maxCard: 2},
                        {type: "perl", maxCard: 1},]
/* 
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
 */
    function buyPack(type, maxCard){
        const pack = cardPack.find( card => card.name === type )
        
        if(pack.name === type){
            if(pack.cards.length < maxCard){
                for(let i = 0 ; i < maxCard ; i++){
                    generateCardPack(type)
                }
            }
        }



    }

    // MOSTRAR CARTAS DEL PACK
/* 
    const pack = cardPack.find( card => card.name === pokoDV )
        
    const showCard = pack.cards.map(pokomon =>{ 
        return(
        <div className="product" key={pokomon.id}>
            <div className='product-image'>
                <Card  pokemon={pokomon ? pokomon : "wait"}/>
            </div>
            <button className='product-button'>Comprar</button>
        </div>
        )
    })
     */
    return(
        <div className='main-market'>
            {packTypes.map(pack => (
                <div key={nanoid()} className='pack-product'>
                    <Pack type={pack.type}/>
                    {pack.maxCard !== 1 ? <h4>Pack of {pack.maxCard} random {pack.type} cards</h4> 
                                        : <h4>{pack.maxCard} random perl card</h4>
                                        }
                    <button onClick={() => {buyPack(pack.type, pack.maxCard)}}>Comprar</button>
                </div>)
            )}
        <div>
            
        </div>

        </div>
    )
}