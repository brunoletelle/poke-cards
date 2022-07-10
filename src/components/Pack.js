import '../styles/components/Pack.scss'
import React from "react"
import { Context } from '../Context'
import Image from "../styles/components/pokeball-gold.png"

export default function Pack(props){



    return(
        <div className="espacio3D">
            <div className="cubo3D">
                <aside className="cara cara1"><img style={{width: "125px", height: "125px"}} src={Image} alt="Card Icon"/></aside>
                <aside className="cara cara11"></aside>
                <aside className="cara cara12"></aside>
                <aside className="cara cara13"></aside>
                <aside className="cara cara14"></aside>
                <aside className="cara cara15"></aside>
                <aside className="cara cara16"></aside>
            </div>
        </div>
    )
}

/* 

                <aside className="caraSide cara3"></aside>
                <aside className="caraSide cara4"></aside>
                <aside className="caraTopBot cara5"></aside>
                <aside className="caraTopBot cara6"></aside>


*/