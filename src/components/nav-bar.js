import React from "react";
import "./nav-bar.scss"

export default function NavBar(){
    return(
        <div className="nav">
            <div className="nav-main">
                <a href>Home</a>
                <a href>Equipo</a>
                <a href>Batalla</a>
                <a href>Market</a>
            </div>
            <div>
                <h3>Coins</h3>
            </div>
        </div>
    )
}