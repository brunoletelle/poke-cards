import {useContext} from "react";
import "../styles/components/NavBar.scss"
import image from "../styles/components/poke-logo2.png"
import {Link as RouteLink} from "react-router-dom"
import { Context } from "../Context";

export default function NavBar(){

    const {userPokomons} = useContext(Context)

    return(
        <div>
            <div className="top" style={{backgroundImage: "url(../background/back-top.png)"}}>
                <img src={image} alt="Imagen de logo pokemon"/>
            </div>
            <div className="nav" >
                <div className="nav-main">
                    <RouteLink to="/" style={{ textDecoration: 'none' }}>
                        <h3>HOME</h3>
                    </RouteLink>
                    {userPokomons.length >= 3 &&
                    <RouteLink to="/pokodex" style={{ textDecoration: 'none' }}>
                        <h3>POKODEX</h3>
                    </RouteLink>
                    }
                    <RouteLink to="/battleground" style={{ textDecoration: 'none' }} >
                        <h3 >BATTLEGROUND</h3>
                    </RouteLink>
                    <RouteLink to="/market" style={{ textDecoration: 'none' }}>
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