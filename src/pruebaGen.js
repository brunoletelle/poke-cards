import React from "react"

export default function PokeGenerator(){
    
    const [physicalMoves, setPhysicalMoves] = React.useState([])
    const [specialMoves, setSpecialMoves] = React.useState([])
    const [pokemon, setPokemon] = React.useState(pokeGenerate)
    const [pokeOk, setPokeOk] = React.useState(false)
    const [physicOk, setPhysicOk] = React.useState(false)
    const [specialOk, setSpecialOk] = React.useState(false)
    
    function randomNumber(max, min){
        return (Math.floor((Math.random() * (max - min + 1)) + min))}
    
    //BUSCO POKEMON RANDOM
    function pokeGenerate(){
        const randomN = randomNumber(151,1)
        fetch(`https://pokeapi.co/api/v2/pokemon/${randomN}/`)
        .then(res => res.json())
        .then(data => {setPokemon(() =>  
            {   setPokeOk(true)
                return({
                name: data.name,
                moves: data.moves,
                type: data.type,
                stats: data.stats,}
            )})
        })
    }
    if(pokeOk){
        // console.log(pokemon.moves)
    }
    
    
        // TENGO QUE PEDIR TODOS LOS MOVES COMUNES Y TODOS LOS ESPECIALES, DESPUES LOS COMPARO CON EL POKEMON
        // MOVIMIENTOS FISICOS
    //console.log("Efecto")
    if(pokeOk && !physicOk){
        fetch("https://pokeapi.co/api/v2/move-damage-class/2/")
        .then(res => res.json())
        .then(data => setPhysicalMoves(() => {
            if(!physicOk){
                console.log("Physical")
                
                function isValidMove(){
                    const random = randomNumber(pokemon.moves.length,0)
                    //console.log(random1)
                    const found = data.moves.some(mov => pokemon.moves[random].move.name === mov.name)
                    //console.log(pokemon.moves[random1].move.name)
                    if(found){
                        
                        return random
                    } else return isValidMove()
                }
                console.log("physicOk esta:",physicOk)
                const random = isValidMove()
                console.log(random)
                const move1 = data.moves.filter(mov => pokemon.moves[random].move.name === mov.name)
                setPhysicOk(true)
            return move1
            }
        }))
        
        // MOVIMIENTOS ESPECIALES
        if(!specialOk){
        fetch("https://pokeapi.co/api/v2/move-damage-class/3/")
        .then(res => res.json())
        .then(data => setSpecialMoves(() => {
            if(!specialOk){
                function isValidMove(){
                    const random = randomNumber(pokemon.moves.length,0)
                    //console.log(random1)
                    const found = data.moves.some(mov => pokemon.moves[random].move.name === mov.name)
                    //console.log(pokemon.moves[random1].move.name)
                    if(found){
                        
                        return random
                    } else return isValidMove()
                }
                const random1 = isValidMove()
                const move1 = data.moves.filter(move => move.name === pokemon.moves[random1].move.name)
                const random2 = isValidMove()
                const move2 = data.moves.filter(move => move.name === pokemon.moves[random2].move.name)
                
                setSpecialOk(true)
                return ([move1, move2])
            }
        }))}
    }
    
    
    
    if(pokeOk&&physicOk&&specialOk){
        console.log(pokemon)
        return(
            <div>
            <h2>{pokemon.name}</h2>
            <h3>{physicalMoves[0].name}</h3>
            <h3>{specialMoves[0][0].name}</h3>
            <h3>{specialMoves[1][0].name}</h3>
        </div>
        )
    } else return(
        <h1>....</h1>
    )
}
/*
//pokemon https://pokeapi.co/api/v2/pokemon/{id}/ data

    -nombre: data.name
    -imagen: data.sprites.front_default

//moves (habilidades) NECESITO FILTRAR POR ATAQUES DISPONIBLES PARA EL POKEMON
    
  -- nombre de habilidad: data.moves[numero random].move.name

  -- url de habilidad: data.moves[numero random].move.url
    
  
    fetch("data.moves[numero random].move.url")
        - Descripcion: data2.effect_entries[0].effect
        - Precision: data2.accuracy
        - Power: data2.power
        - Tipo: data2.type.name
        - Clase de daño: data2.damage_class.name ----- ESTO ES: DAÑO FISICO - DAÑO ESPECIAL - DAÑO DE ESTADO ----

// tipo de pokemon: data.types[0].type.name
    url de tipo: data.types[0].type.url
    SIRVE PARA SABER EL DAÑO RECIBIDO
        fetch(data.types[0].type.url)
        data.damage_relations

// stats: 
    arreglo de habilidades: data.stats

        valor: data.stats[xx].base_stat
        nombre: data.stats[xx].stat.name

        xx = [0] HP
             [1] ATTACK
             [2] DEFENSE
             [3] SPECIAL-DEFENSE
             [4] SPECIAL-ATTACK
             [5] SPEED

*/