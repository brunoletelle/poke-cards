import {useEffect, useContext, useState} from "react"
import "../styles/components/Team.scss"
import Card from "./Cards-actual"
import { Context } from "../Context"

export default function Team(){

    const {userPokomons} = useContext(Context)

    return(
        <div className="main" style={{backgroundImage: "url(../background/background-team.png)"}}>
            <div className="poke-container">
                <Card pokemon={userPokomons[0] ? userPokomons[0] : "wait"} />
                {userPokomons[0] && <h2>{userPokomons[0].description}</h2>}
            </div>
            <div className="poke-container">
                <Card pokemon={userPokomons[1] ? userPokomons[1] : "wait"} />
                {userPokomons[1] && <h2>{userPokomons[1].description}</h2>}
            </div>
            <div className="poke-container">
                <Card pokemon={userPokomons[2] ? userPokomons[2] : "wait"} />
                {userPokomons[2] && <h2>{userPokomons[2].description}</h2>}
            </div>
        </div>
    )
}