import React from "react";
import "./nav-bar.scss"

export default function NavBar(){
    return(
        <div className="nav">
            <div className="nav-main">
                <a href>HOME</a>
                <a href>EQUIPO</a>
                <a href>BATALLA</a>
                <a href>MARKET</a>
            </div>
            <div>
                <h3>COINS</h3>
            </div>
        </div>
    )
}