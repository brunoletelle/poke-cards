import React from "react";
import "./NavBar.scss"
import image from "./poke-logo2.png"
import {Link as RouteLink} from "react-router-dom"

export default function NavBar(){
    return(
        <div>
            <div className="top" style={{backgroundImage: "url(../background/back-top.png)"}}>
                <img src={image} alt="Imagen de logo pokemon"/>
            </div>
            <div className="nav">
                <div className="nav-main">
                    <RouteLink to="/">
                        <h3>HOME</h3>
                    </RouteLink>
                    <RouteLink to="/team">
                        <h3>TEAM</h3>
                    </RouteLink>
                    <RouteLink to="/battleground">
                        <h3>BATTLEGROUND</h3>
                    </RouteLink>
                    <RouteLink to="/market">
                        <h3>MARKET</h3>
                    </RouteLink>
                </div>
                <div>
                    <h3>COINS</h3>
                </div>
            </div>
        </div>
    )
}