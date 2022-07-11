import {useContext} from "react"
import { Context } from "../Context"
import Card from "./Cards-actual"
import "../styles/components/ModalPack.scss"

export default function ModalPack(props){

    const {cardPack} = useContext(Context)
    const packObj = cardPack.filter( pack => pack.name === props.name)

    return(
        <div className="modal-pack-container">
            {packObj[0].cards.map(pokomon => (
                        <div className="modal-pack-card">
                            <Card pokemon={pokomon} />
                        </div>
                        
                        ))}
        </div>
    )
}