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
    }
    
    // TENGO QUE PEDIR TODOS LOS MOVES COMUNES Y TODOS LOS ESPECIALES, YA QUE NO VOY A USAR LOS DE ESTADO
        
    //MOVIMIENTO FISICO
    
    const physicalData = await getDataMoves(2) // 2 por movimiento fisico
    const physicalMove = getMoves(physicalData.moves)
    
    await moveSpec(physicalMove.url,physicalMove.name, "physical")
    
    //MOVIMIENTOS ESPECIALES
    
    const specialData1 = await getDataMoves(3) // 3 por movimiento especial
    const specialMove1 = getMoves(specialData1.moves)
    
    const specialData2 = await getDataMoves(3) // 3 por movimiento especial
    const specialMove2 = getMoves(specialData2.moves)

    await moveSpec(specialMove1.url,specialMove1.name, "special")
    await moveSpec(specialMove2.url,specialMove2.name, "special")
    
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
    async function moveSpec(url, moveName, type){
        
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

}
