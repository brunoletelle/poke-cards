export default async function pokeGenerator(){

    //const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
    
    const randomN = randomNumber(151,1)
    function randomNumber(max, min){
        return (Math.floor((Math.random() * (max - min + 1)) + min))
    }
    
    //BUSCO POKEMON RANDOM

    const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomN}/`)
    const pokemonData = await pokemonResponse.json()

    const pokemon = {
        name: pokemonData.name.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()),
        id: pokemonData.id,
        imageFront: pokemonData.sprites.front_default,
        imageBack: pokemonData.sprites.back_default,
        moves: pokemonData.moves,
        moveArray: [],
        type: pokemonData.types,
        stats: pokemonData.stats,
        level: "",
        DV: "",
        background: `/background-images/${randomNumber(3,0)}.png`,
        backgroundType: [],
    }
    
    // TENGO QUE PEDIR TODOS LOS MOVES COMUNES Y TODOS LOS ESPECIALES, YA QUE NO VOY A USAR LOS DE ESTADO
        
    //MOVIMIENTO FISICO
    
    const physicalData = await getDataMoves(2) // 2 por movimiento fisico
    const physicalMove = getMoves(physicalData.moves)
    
    await moveSpec(physicalMove.url,physicalMove.name)
    
    //MOVIMIENTOS ESPECIALES
    
    const specialData = await getDataMoves(3) // 3 por movimiento especial
    const specialMove = getMoves(specialData.moves)

    statsGen()
    backgroundColor()

    await moveSpec(specialMove.url,specialMove.name)
    
    return pokemon

    //OBTENGO LOS DATOS DE LOS MOVIMIENTOS

    async function getDataMoves(type){
        
        let res = await fetch(`https://pokeapi.co/api/v2/move-damage-class/${type}/`)
        let data = await res.json()
        return data
    }
    
    //ELIJO MOVIMIENTOS RANDOM DE LA CLASE QUE CORRESPONDE (VERIFICO)
    function getMoves(data){
        
        function isValidMove(){
            const random = randomNumber(pokemon.moves.length-1,0)
            const found = data.some(mov => pokemon.moves[random].move.name === mov.name)
            
            if(found){
                return random
            } else return isValidMove()
        }
        const random = isValidMove()
        const move = data.filter(mov => pokemon.moves[random].move.name === mov.name)
        return (move[0])
    }
    
//}

    // OBTENGO Y ORDENO LAS ESPCIFICACIONES DE LOS MOVIMIENTOS
    async function moveSpec(url, moveName){
        
        let response = await fetch(`${url}`)
        let data = await response.json()

        
        pokemon.moveArray = [...pokemon.moveArray,
                            {   id: data.id,
                                name: moveName.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()),
                                description: data.effect_entries[0].effect,
                                precision: data.accuracy,
                                power: data.power,
                                type: data.type.name.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()),
                                classDamage: data.damage_class.name.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()),
                            }]
                        

    }

    // Generador de Stats y DV del pokemon

    function statsGen(){
        const DV = randomNumber(15,0)
        const level = randomNumber(29,25)
        
        pokemon.DV = DV
        pokemon.level = level

        const hp = Math.floor((pokemon.stats[0].base_stat+DV)*2/100)*level + level + 10
        
        const stat = [hp]

        for(let i=1; i<6; i++){
            stat.push(Math.floor((pokemon.stats[i].base_stat+DV)*2/100)*level + level + 5)
            console.log("Antes de Calculo:" ,pokemon.stats[i].base_stat)
        }

        for(let i = 0 ; i<6 ; i++){
            pokemon.stats[i] = {...pokemon.stats[i], levelDV_stat: stat[i]}
            console.log("Despues de Calculo:" ,stat[i])
        }
    }

    // Color de fondo de la carta de acuerdo al tipo de pokemon
    
    function backgroundColor(){
        const type = pokemon.type
        const typeColor = []

        for(let i = 0; i < type.length; i++){
            const t = type[i].type.name
            console.log(t)
            if(t === "bug"){
                typeColor.push("#ADD65A")
            } else if(t === "dark"){
                typeColor.push("#ADA3BF")
            } else if(t === "dragon"){
                typeColor.push("#6097C4")
            } else if(t === "electric"){
                typeColor.push("#FCE677")
            } else if(t === "fairy"){
                typeColor.push("#FAC0F2")
            } else if(t === "fighting"){
                typeColor.push("#E082A1")
            } else if(t === "fire"){
                typeColor.push("#FFA861")
            } else if(t === "flying"){
                typeColor.push("#89AAE3")
            } else if(t === "ghost"){
                typeColor.push("#677AA8")
            } else if(t === "grass"){
                typeColor.push("#A5DEBC")
            } else if(t === "ground"){
                typeColor.push("#CF967A")
            } else if(t === "ice"){
                typeColor.push("#99DED5")
            } else if(t === "normal"){
                typeColor.push("#B0B0B0")
            } else if(t === "poison"){
                typeColor.push("#BC97C9")
            } else if(t === "psychic"){
                typeColor.push("#FAB1B9")
            } else if(t === "rock"){
                typeColor.push("#C8B686")
            } else if(t === "steel"){
                typeColor.push("#7195A3")
            } else if(t === "water"){
                typeColor.push("#6DAADB")
            }
        }

        if(typeColor.length === 1){
            typeColor.push(typeColor[0])
        }
    
        pokemon.backgroundType = typeColor
        console.log(pokemon.backgroundType)
    }

}