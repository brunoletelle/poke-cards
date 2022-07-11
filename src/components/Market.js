import '../styles/components/Market.scss'

import {useEffect, useContext} from "react"
import { Context } from '../Context'
import ModalPack from './ModalPack'
import Pack from "./Pack"
import { nanoid } from "nanoid"
import Modal from './Modal'
import { useModal } from '../hooks/useModal'


export default function Market(){

    const {cardPack, generateCardPack} = useContext(Context)

    const [isOpen, openModal, closeModal] = useModal(false)

    const packTypes = [{type: "bronze", maxCard: 5},
                        {type: "silver", maxCard: 4},
                        {type: "gold", maxCard: 2},
                        {type: "perl", maxCard: 1},]
                        
    function buyPack(type, maxCard){
        const pack = cardPack.find( card => card.name === type )
        
        if(pack.name === type){
            if(pack.cards.length < maxCard){
                for(let i = 0 ; i < maxCard ; i++){
                    generateCardPack(type)
                }
            }
        }

        setTimeout(openModal, 1000)
    }

    return(
        
        <div className='main-market'>
            <div className='pack-market'>
                {packTypes.map(pack => (
                    <div key={nanoid()} className='pack-product'>
                        <Pack type={pack.type}/>
                        {pack.maxCard !== 1 ? <h4>Pack of {pack.maxCard} random {pack.type} cards</h4> 
                                            : <h4>{pack.maxCard} random perl card</h4>
                        }
                        <button onClick={() => {buyPack(pack.type, pack.maxCard)}}>Comprar</button>
                    </div>)
                )}
            </div>

            <Modal isOpen={isOpen} close={closeModal}>
                    <ModalPack name="bronze"/>
            </Modal>

        </div>
    )
}