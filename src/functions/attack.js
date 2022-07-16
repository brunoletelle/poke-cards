export default function attack(attacker, defender, moveSpec){
    
    //Nivel del atacante
    const lv = attacker.level
    
    //"ataque normal = Normal lucha volador veneno tierra roca bicho fantasma acero"
    //ataque especial = fuego agua planta electrico psiquico hielo dragon siniestro
    const att = atta()

    function atta(){
        if(moveSpec.type === ("Normal" || "Fighting" || "Flying" || "Poison" || "Rock" || "Bug" || "Ghost" || "Steel")){
            return attacker.stats[1].levelDV_stat
        } else return attacker.stats[3].levelDV_stat

    }
    
    //poder del movimiento
    const power = moveSpec.power
    
    //"defensa normal o especial dependiendo del ataque"
    const defense = def()

    function def(){
        if(moveSpec.classDamage === "Physical"){
            return defender.stats[2].levelDV_stat
        } else return defender.stats[4].levelDV_stat
    }

    const primMod = 1 //"clima "
    
    //Este valor depende del tipo de pokomon y el ataque, si son iguales vale 1.5
    const stab = sta()

    function sta(){
        if(attacker.type === moveSpec.type){
            return 1.5
        } else return 1
    }

    //Efecto del tipo de ataque y el tipo de pokomon que se defiende
    const effectType1 = effect(defender.type[0], moveSpec)
    
    const effectType2 = eff2()

    function eff2(){
        if(defender.type.length === 1){ 
            return 1
        } else return (effect(defender.type[1],moveSpec))
    }

    function effect(defenderType, move){
        if(defenderType === move.no_damage_to){
            return 0
        } else if(defenderType === move.half_damage_to){
            return 0.5
        } else if(defenderType === move.double_damage_to){
            return 2
        } else return 1
    }
    
    //No se usa porque depende de otros efectos
    const segMod = 1

    //Valor random entre 85 y 100
    const rnd = Math.floor(Math.random() * (100 - 85 + 1) + 85)
    const ch = 1
    
    const damage = Math.floor(((((2 * lv / 5 + 2) * att * power / defense) / 50) * primMod + 2) * stab * effectType1 * effectType2 * segMod * rnd / 100) * ch; 
   
    console.log("damage", damage)
    return(damage)
}