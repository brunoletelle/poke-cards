import "./Home.scss"
import {useState, useEffect} from "react"
import ReactDOM from "react-dom"
import Card from "./Cards-actual"

export default function Home(){

    const [show, setShow] = useState(false)

    return(
        <div className="home">
            { show &&
            <div className="card-list">
                <Card className="card"/>
                <Card className="card"/>
                <Card className="card"/>
            </div>}
        </div>
    )
}


