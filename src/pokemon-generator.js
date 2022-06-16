

export default function pokeGenerator(){
    
    //const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
    
    let pokemon = {}
    let physicalMoves = []
    let specialMoves = []

    function randomNumber(max, min){
        return (Math.floor((Math.random() * (max - min + 1)) + min))}
    
    pokeGenerate()
    
        //BUSCO POKEMON RANDOM
    function pokeGenerate(){
        const randomN = randomNumber(151,1)
        fetch(`https://pokeapi.co/api/v2/pokemon/${randomN}/`)
        .then(res => res.json())
        .then(data => {

                pokemon =  {
                name: data.name,
                imageFront: data.sprites.front_default,
                imageBack: data.sprites.back_default,
                moves: data.moves,
                moveSpec : [],
                type: data.type,
                stats: data.stats,}
                //console.log(pokemon.stats)
                moveGenerate()
                }
            )
        }
    
        // TENGO QUE PEDIR TODOS LOS MOVES COMUNES Y TODOS LOS ESPECIALES, DESPUES LOS COMPARO CON EL POKEMON
        // MOVIMIENTOS FISICOS
        
    function moveGenerate(){

        //MOVIMIENTO FISICO
        fetch("https://pokeapi.co/api/v2/move-damage-class/2/")
        .then(res => res.json())
        .then(data => {
            function isValidMove(){
                const random = randomNumber(pokemon.moves.length,0)
                const found = data.moves.some(mov => pokemon.moves[random].move.name === mov.name)

                if(found){
                    return random
                } else return isValidMove()
            }
            
            const random = isValidMove()
            const move1 = data.moves.filter(mov => pokemon.moves[random].move.name === mov.name)
            
            physicalMoves = move1
            console.log("Movimientos fisicos: ",physicalMoves[0].url)
            moveSpec(physicalMoves[0].url, physicalMoves[0].name)
        })
        
        // MOVIMIENTOS ESPECIALES
        fetch("https://pokeapi.co/api/v2/move-damage-class/3/")
        .then(res => res.json())
        .then(data => {
            
            function isValidMove(){
                const random = randomNumber(pokemon.moves.length,0)
                const found = data.moves.some(mov => pokemon.moves[random].move.name === mov.name)
                
                if(found){
                    return random
                } else return isValidMove()
            }
            const random1 = isValidMove()
            const move1 = data.moves.filter(move => move.name === pokemon.moves[random1].move.name)
            const random2 = isValidMove()
            const move2 = data.moves.filter(move => move.name === pokemon.moves[random2].move.name)
            
            specialMoves = [move1, move2]
            console.log("movimientos especiales:",specialMoves[0][0].url)
            console.log("movimientos especiales:",specialMoves[1][0].url)
            
            moveSpec(specialMoves[0][0].url, specialMoves[0][0].name)
            moveSpec(specialMoves[1][0].url, specialMoves[1][0].name)
            
            
        })

        //OBTENER ESPECIFICACIONES DE CADA MOVIMIENTO
        function moveSpec(url, moveName){
            
            fetch(`${url}`)
            .then(res => res.json())
            .then(data => {
                pokemon.moveSpec = [...pokemon.moveSpec,
                    {   name: moveName,
                        description: data.effect_entries[0].effect,
                        precision: data.accuracy,
                        power: data.power,
                        type: data.type.name,
                        classDamage: data.damage_class.name,
                    }]

                    //console.log(pokemon.moveSpec)
                })
            }

    }
    
    setTimeout(() => {return pokemon},4000)
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