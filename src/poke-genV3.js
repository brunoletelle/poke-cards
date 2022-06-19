
export default async function PokeGenerator(){
    
    // const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
    
    
    let physicalMoves = []
    let specialMoves = []
    let pokemon = {}

    function randomNumber(max, min){
        return (Math.floor((Math.random() * (max - min + 1)) + min))}

    pokemon = await pokeGenerate()
    
    
    //BUSCO POKEMON RANDOM
    async function pokeGenerate(){
        const randomN = randomNumber(151,1)

        const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomN}/`)
        const pokemonData = await pokemonResponse.json()
        return pokeGen(await pokemonData)
        
        async function pokeGen(data){
            pokemon = {
            name: data.name,
            imageFront: data.sprites.front_default,
            imageBack: data.sprites.back_default,
            moves: data.moves,
            moveSpec : [],
            type: data.types,
            stats: data.stats,}
            //console.log(pokemon.stats)
            return moveGenerate(pokemon)
        }
    }
        
    
        // TENGO QUE PEDIR TODOS LOS MOVES COMUNES Y TODOS LOS ESPECIALES, YA QUE NO VOY A USAR LOS DE ESTADO

        // MOVIMIENTOS FISICOS
        
    async function moveGenerate(pokemon){

        //MOVIMIENTO FISICO
        async function getPhysical(){
            let physicalResponse = await fetch("https://pokeapi.co/api/v2/move-damage-class/2/")
            let physicalData = await physicalResponse.json()
            return await physicalData
        }
        
        const physicalData = await getPhysical()
        getPhysicalMoves(await physicalData)

        async function getPhysicalMoves(physicalData){

            async function isValidMove(){
                const random = randomNumber(pokemon.moves.length,0)
                const found = await physicalData.moves.some(mov => pokemon.moves[random].move.name === mov.name)
    
                if(found){
                    return random
                } else return isValidMove()
            }
            
            const random = await isValidMove()
            const movep = await physicalData.moves.filter(mov => pokemon.moves[random].move.name === mov.name)
            
            physicalMoves = movep
            //console.log("Movimientos fisicos: ",physicalMoves[0].url)
            moveSpec(physicalMoves[0].url, physicalMoves[0].name)
        }
        

        
        // MOVIMIENTOS ESPECIALES

        async function getSpecial(){
            let specialResponse = await fetch("https://pokeapi.co/api/v2/move-damage-class/3/")
            let specialData = await specialResponse.json()
            return await specialData
        }

        const specialData = await getSpecial()
        getSpecialMoves(await specialData)

        async function getSpecialMoves(specialData){
            
            async function isValidMove(){
                const random = randomNumber(pokemon.moves.length,0)
                const found = await specialData.moves.some(mov => pokemon.moves[random].move.name === mov.name)
                
                if(found){
                    return random
                } else return isValidMove()
            }
            const random1 = await isValidMove()
            const move1 = await specialData.moves.filter(mov => mov.name === pokemon.moves[random1].move.name)
            const random2 = await isValidMove()
            const move2 = await specialData.moves.filter(mov => mov.name === pokemon.moves[random2].move.name)
            
            specialMoves = [move1, move2]
            //console.log("movimientos especiales:",specialMoves[0][0].url)
            //console.log("movimientos especiales:",specialMoves[1][0].url)
            
            moveSpec(specialMoves[0][0].url, specialMoves[0][0].name)
            moveSpec(specialMoves[1][0].url, specialMoves[1][0].name)
        }

        async function moveSpec(url, moveName){
            
            let response = await fetch(`${url}`)
            let data = await response.json()
            
            pokemon.moveSpec = [... pokemon.moveSpec,
                                {   name: moveName,
                                    description: data.effect_entries[0].effect,
                                    precision: data.accuracy,
                                    power: data.power,
                                    type: data.type.name,
                                    classDamage: data.damage_class.name,
                                }]
        }
        return await pokemon
    }
    
    //setTimeout(() => {return console.log(pokemon)},3500)
    
    return pokemon
}