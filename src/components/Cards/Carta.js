import { useContext, useEffect, useState } from "react";
import Card from "./Cards-actual";
import { Context } from "../../Context";

export default function Carta(){

    const {userTeam, generateTeam} = useContext(Context)

    const [on, setOn] = useState(false)

    useEffect(()=>{
        generateTeam()
    },[])
    function handleClick(){
        setOn(true)
    }

    return(
        <div>
            <div>
                <button onClick={() => handleClick()}>Generar</button>
            </div>
            {on &&
            <Card pokemon={userTeam[0]}/>}
        </div>
    )
}