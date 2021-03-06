import {useContext} from "react"
import { Context } from "../../Context"
import Card from "../Cards/Cards-actual"
import "./styles/ModalPack.scss"
import { nanoid } from "nanoid"


export default function ModalPack(props){

    const {cardPack, setCardPack, setUserPokomons} = useContext(Context)
    const packPokomons = cardPack.filter( pack => pack.name === props.name)

    function addPackToUser(){
        packPokomons[0].cards.map(pokomon => {
            setUserPokomons(prevUser => [...prevUser, pokomon])
            return pokomon
        })

        setCardPack((prevPack) => {
            const newPack = prevPack.map(pac => {
                if(pac.name === props.name){
                    return ({ name: pac.name,
                                cards: []  
                    })
                } else return pac
            })
            return(newPack)
        })

    }

    return(
        <div className="modal-pack">
            <div className="modal-pack-container-cards">
                {    packPokomons[0].cards.map(pokomon => (
                            <div key={nanoid()} className="modal-pack-card">
                {packPokomons[0].cards.length === props.max  ?
                                <Card pokemon={pokomon} />
                                :
                                <img className="loading" src="https://c.tenor.com/fSsxftCb8w0AAAAi/pikachu-running.gif" alt="loading" />
                            }           
                            </div>
                            ))
                }
                
            </div>
            <h2>Compra Exitosa!</h2>
            <button onClick={() => addPackToUser()}>AGREGAR A POKODEX</button>
        </div>
    )
}