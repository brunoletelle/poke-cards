import {useContext, useEffect, useState} from "react"
import { Context } from "../Context"
import "../styles/components/Battleground.scss"
import { nanoid } from "nanoid"
import attack from "../functions/attack"

export default function Battleground(){

   const {userTeam, generateTeam, generateAdvTeam, cpuTeam} = useContext(Context)
   const [isSelected, setIsSelected] = useState(0)
   const [currentAdv, setCurrentAdv] = useState(0)
   const [turn, setTurn] = useState(true)
   const [battleTeam, setBattleTeam] = useState([...userTeam])
   const [battleCpuTeam, setBattleCpuTeam] = useState([...cpuTeam])
   const [cpuWin, setCpuWin] = useState(false)
   const [userWin, setUserWin] = useState(false)

   //let battleTeam = [...userTeam]
   //let battleCpuTeam = [...cpuTeam]
   
   const icons = `/icons/type_icons/class_icon_`

   function randomNumber(max, min){
      return (Math.floor((Math.random() * (max - min + 1)) + min))
  }
    
   useEffect(() => {
        // ESTO VA A TRAER UN ERROR POR EL LENGTH        
      generateTeam()
      generateAdvTeam()
   }, [])
   
   useEffect(() => {
      setBattleTeam([...userTeam])
      setBattleCpuTeam([...cpuTeam])
   }, [userTeam, cpuTeam])


   useEffect(() =>{
      if(!turn){
         setTimeout( () =>{
            if(battleCpuTeam[currentAdv].stats[0].base_stat > 0){
               attackControl(battleCpuTeam[currentAdv], battleTeam[isSelected], battleCpuTeam[currentAdv].moveArray[randomNumber(1,0)])
            } else {
                  setCurrentAdv(prevAdv => {
                     if(prevAdv !== 2){
                        return (prevAdv + 1)
                     } else {
                        setUserWin(true)
                        return 0
                     }
                  })
                  setTurn(!turn)
               }
         }
         ,2000)
      }
      if(battleTeam.lenght ===3 ){
      const lose = battleTeam.filter(pokomon => pokomon.stats[0].base_stat !== 0)
      if(lose.length === 0){
         console.log(lose)
         setCpuWin(true)
      }} 
      
   },[turn])

   useEffect(() => {
      console.log("CPU WIN", cpuWin)

      if(userWin){
         console.log("GANASTE")
      }
      if(cpuWin){
         console.log("PERDISTE")
      }

   },[userWin,cpuWin])


   //FUNCION QUE ACTUALIZA LA BARRA DE VIDA
   function hpBar(fullHp,leftHp){
      const lifeLeft = Math.floor((leftHp/fullHp)*100)
      return( `${lifeLeft}%`)
   }
    
   //Control de ataque, cambio de vida del defensor y manejo de turno
   function attackControl(attacker, defender, move){

      const damage = attack(attacker, defender, move)

      let hp = defender.stats[0].base_stat - damage
      if(hp < 0){
         hp = 0
      }
      
      if(cpuTeam.some(poke => poke.id === defender.id)){
         setBattleCpuTeam(prevCpuTeam => {
            const arr = prevCpuTeam.map(pokomon => {
               if(pokomon.id === defender.id){
                  const pokomonNewHp = pokomon.stats.map( st => {
                                                         if(st.stat.name === "hp"){
                                                            return({...st, base_stat: hp})
                                                         } else return (st)
                                                      })
                                 return {...pokomon, stats: pokomonNewHp}
                              } else return pokomon
                        })
            return arr
         })
      } else setBattleTeam(prevTeam => {
               const arr = prevTeam.map(pokomon => {
                  if(pokomon.id === defender.id){
                     const pokomonNewHp = pokomon.stats.map( st => {
                                                            if(st.stat.name === "hp"){
                                                               return({...st, base_stat: hp})
                                                            } else return (st)
                                                         })
                     return {...pokomon, stats: pokomonNewHp}
                  } else return pokomon
               })
               return arr
            })

      setTurn(prevTurn => !prevTurn)
   }
    
    
   return(
      battleTeam.length === 3 && battleCpuTeam.length === 3 ?
      <div className="main-battle">
         <div className="battle-background" style={{backgroundImage: "url(../background/gym.png)"}}>
            <img className="userPokemon-img" src={battleTeam[isSelected].imageBack} alt="pokomon selected back" />

            <div className="userBench">
               {battleTeam.map( (pokemon, index) => (
                  <div className="userBenchPokemon" key={nanoid()}>
                     <img className="userBenchPokemon-img"  onClick={() => setIsSelected(index)} src={pokemon.imageFront} alt="pokomon selected back" />
                  </div>
               ))}
            </div>

            <div className="cpuBench">
               {battleCpuTeam.map( (pokemon) => (
                  <div className="cpuBenchPokemon" key={nanoid()} >
                     <img className="cpuBenchPokemon-img" src={pokemon.imageFront} alt="pokomon selected back" />
                  </div>
               ))}
            </div>

            <img className="pcPokemon-img" src={cpuTeam[currentAdv].imageFront} alt="pokomon selected front" />

            <div className="currentAdv-info">
               <h3>{battleCpuTeam[currentAdv].name}</h3>
               <div className="progress-bar-cpu">
                  <div style={{width: hpBar(cpuTeam[currentAdv].stats[0].base_stat,battleCpuTeam[currentAdv].stats[0].base_stat)}}>
                     { battleCpuTeam[currentAdv].stats[0].base_stat}
                  </div>
               </div>
            </div>

            <div className="selected-info">
               <h3>{battleTeam[isSelected].name}</h3>
               <div className="progress-bar">
                  <div style={{width: hpBar(userTeam[isSelected].stats[0].base_stat,battleTeam[isSelected].stats[0].base_stat)}}>
                     {battleTeam[isSelected].stats[0].base_stat}
                  </div>
               </div>

               <div className="moves">
                  {battleTeam[isSelected].moveArray.map( move =>
                     <div className="moves-button" onClick={() => attackControl(battleTeam[isSelected], battleCpuTeam[currentAdv], move )} key={nanoid()} >
                        <img src={icons+`${move.type.toLowerCase()}.png`} alt="move icon" />
                        <h3>{move.name}</h3>
                        <h3>{move.power}</h3>
                     </div>
                  )}
               </div>

            </div>

         </div>
      </div>
      : 
      <div>
         <h2>Tu equipo no esta completo aún, debes tener selecionados 3 pokomons para iniciar la batalla</h2>
      </div>
        
    )
}