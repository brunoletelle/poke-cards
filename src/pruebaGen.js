async function PokeGenerator(){

    const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
    
    
    let physicalMoves = []
    let specialMoves = []

    const pokemon = await pokeGenerate()

    function randomNumber(max, min){
        return (Math.floor((Math.random() * (max - min + 1)) + min))}
    
    //BUSCO POKEMON RANDOM

    async function pokeGenerate(){
        const randomN = randomNumber(151,1)
        
        const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomN}/`)
        const pokemonData = await pokemonResponse.json()

        const poke = {
            name: pokemonData.name,
            imageFront: pokemonData.sprites.front_default,
            imageBack: pokemonData.sprites.back_default,
            moves: pokemonData.moves,
            physicalMove: [],
            specialMove: [],
            type: pokemonData.types,
            stats: pokemonData.stats,
        }

        //VALIDO Y ORDENO LOS MOVIMIENTOS
        const pokemon = await moveGenerate(poke)
        
        return pokemon
    }
        
        // TENGO QUE PEDIR TODOS LOS MOVES COMUNES Y TODOS LOS ESPECIALES, YA QUE NO VOY A USAR LOS DE ESTADO
        
    async function moveGenerate(pokemon){

        //MOVIMIENTO FISICO
        
        const physicalData = await getPhysical()
        const physicalMove = getPhysicalMoves(physicalData.moves)


        
        async function getPhysical(){
            let physicalResponse = await fetch("https://pokeapi.co/api/v2/move-damage-class/2/")
            let physicalData = await physicalResponse.json()
            return physicalData
        }

        function getPhysicalMoves(physicalData){

            //const movep = physicalData.filter(mov => pokemon.moves[random].move.name === mov.name)
            
            //VERIFICO QUE EL MOVIMIENTO NO SEA DE ESTADO O ESPECIAL
            
            function isValidMove(){
                
                const random = randomNumber(pokemon.moves.length-1,0)
                const found = physicalData.some(mov => pokemon.moves[random].move.name === mov.name)
                
                if(found){
                    return random
                } else return isValidMove()
            }
            
            const random = isValidMove()
            return (physicalData.filter(mov => pokemon.moves[random].move.name === mov.name))
            /* 
            physicalMoves = movep

            console.log("Movimientos fisicos: ",physicalMoves[0].url)
             */

            // moveSpec(physicalMoves[0].url, physicalMoves[0].name, "physical")
            
        }
        
        // MOVIMIENTOS ESPECIALES

        const specialData = await getSpecial()
        const specialMoves = getSpecialMoves(specialData)

        async function getSpecial(){
            let specialResponse = await fetch("https://pokeapi.co/api/v2/move-damage-class/3/")
            let specialData = await specialResponse.json()
            return specialData
        }

        function getSpecialMoves(specialData){

            //VERIFICO QUE EL MOVIMIENTO NO SEA DE ESTADO O FISICO
            function isValidMove(){
                const random = randomNumber(pokemon.moves.length-1,0)
                const found = specialData.moves.some(mov => pokemon.moves[random].move.name === mov.name)
                
                if(found){
                    return random
                } else return isValidMove()
            }
            const random1 = isValidMove()
            const move1 = specialData.moves.filter(mov => mov.name === pokemon.moves[random1].move.name)

            const random2 = isValidMove()
            const move2 = specialData.moves.filter(mov => mov.name === pokemon.moves[random2].move.name)
            
            return([move1, move2])
            /* 
            specialMoves = [move1, move2]

            console.log("movimientos especiales:",specialMoves[0][0].url)
            console.log("movimientos especiales:",specialMoves[1][0].url)
            
            moveSpec(specialMoves[0][0].url, specialMoves[0][0].name, "special")
            moveSpec(specialMoves[1][0].url, specialMoves[1][0].name, "special") */
        }

        // OBTENGO Y ORDENO LAS ESPCIFICACIONES DE LOS MOVIMIENTOS
        async function moveSpec(url, moveName, type){
            
            let response = await fetch(`${url}`)
            let data = await response.json()

            if(type === "physical"){ 
                pokemon.physicalMove = [...pokemon.physicalMove,
                                    {   name: moveName,
                                        description: data.effect_entries[0].effect,
                                        precision: data.accuracy,
                                        power: data.power,
                                        type: data.type.name,
                                        classDamage: data.damage_class.name,
                                    }]
                            }
            if(type === "special"){ 
                console.log("is special")
                pokemon.specialMove = [...pokemon.specialMove,
                                    {   name: moveName,
                                        description: data.effect_entries[0].effect,
                                        precision: data.accuracy,
                                        power: data.power,
                                        type: data.type.name,
                                        classDamage: data.damage_class.name,
                                    }]
            }

        }
        
        return pokemon

    }
    
    //setTimeout(() => {return console.log(pokemon)},3500)
    
    //console.log(pokemon)
    return pokemon
}

PokeGenerator()
/* sincrona()
function sincrona(){
    PokeGenerator().then(data => console.log(data.name))
} */

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
