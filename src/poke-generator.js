import React from "react"
/*
//pokemon https://pokeapi.co/api/v2/pokemon/{id}/ data

    -nombre: data.name
    -imagen: data.sprites.front_default

//moves (habilidades)
    
  -- nombre de habilidad: data.moves.{numero random}.move.name

  -- url de habilidad: data.moves.{numero random}.move.url
    
  
    fetch("data.moves.{numero random}.move.url")
        - Descripcion: data2.effect_entries[0].effect
        - Precision: data2.accuracy
        - Power: data2.power
        - Tipo: data2.type.name

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
             [5] SPEED



*/