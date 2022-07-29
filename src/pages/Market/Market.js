import './styles/Market.scss'

import {useState, useContext} from "react"
import { Context } from '../../Context'
import ModalPack from "../../components/Modals/ModalPack"
import Pack from "./components/Pack/Pack"
import { nanoid } from "nanoid"
import Modal from '../../components/Modals/Modal'
import { useModal } from '../../hooks/useModal'


export default function Market(){

    const {cardPack, generateCardPack, inBattle, coins, setCoins} = useContext(Context)

    const [isOpen, openModal, closeModal] = useModal(false)

    const [typeBuy, setTypeBuy] = useState("bronze")
    const [cardSize, setCardSize] = useState(5)

    const packTypes = [{type: "bronze", maxCard: 5, price: 200},
                        {type: "silver", maxCard: 4, price: 300},
                        {type: "gold", maxCard: 2, price: 400},
                        {type: "perl", maxCard: 1, price: 500},]
                        
    function buyPack(type, maxCard){
        const pack = cardPack.find( card => card.name === type )
        
        if(pack.name === type){
            if(pack.cards.length < maxCard){
                for(let i = 0 ; i < maxCard ; i++){
                    generateCardPack(type)
                }
            }
        }
        setCoins(prevCoins => prevCoins - pack.price)

        openModal()
        setTypeBuy(type)
        setCardSize(maxCard)
    }

    return(
        
        <div className='main-market' style={{backgroundImage: "url(../background/background-market.png)"}}>
            
            {inBattle ?
            <div className='warning-battle-market'>
                <h3>Durante la batalla no puedes comprar cartas</h3>
            </div>
            :
            <div className='pack-market'>
                {packTypes.map(pack => (
                    <div key={nanoid()} className='pack-product'>
                        <Pack type={pack.type} />
                        {pack.maxCard !== 1 ? <h4>Pack de {pack.maxCard} cartas {pack.type} random</h4> 
                                            : <h4>{pack.maxCard} carta random perl</h4>
                        }
                        <h4 className='pack-price'>${pack.price}</h4>
                        {pack.price <= coins ?
                        <button onClick={() => {buyPack(pack.type, pack.maxCard)}}>COMPRAR</button>
                        :
                        <button style={{backgroundColor: "white"}}>No hay coins</button>
                        }
                    </div>)
                )}
            </div>
            }
            <Modal isOpen={isOpen} close={closeModal} hideClose={false}>
                    <ModalPack name={typeBuy} max={cardSize}/>
            </Modal>

        </div>
    )
}