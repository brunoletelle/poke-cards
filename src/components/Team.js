import {useEffect, useContext, useState} from "react"
import "./Team.scss"
import Card from "./Cards-actual"
import { Context } from "../Context"

export default function Team(){

    const {userPokomons} = useContext(Context)

    return(
        <div className="main" style={{backgroundImage: "url(../background/background-team.png)"}}>
            <Card pokemon={userPokomons[0] ? userPokomons[0] : "wait"} />
            <Card pokemon={userPokomons[1] ? userPokomons[1] : "wait"} />
            <Card pokemon={userPokomons[2] ? userPokomons[2] : "wait"} />
        </div>
    )
}