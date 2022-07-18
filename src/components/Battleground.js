import {useContext, useEffect, useState} from "react"
import { Context } from "../Context"
import "../styles/components/Battleground.scss"
import { nanoid } from "nanoid"
import attack from "../functions/attack"
import Modal from "./Modal"
import { useModal } from "../hooks/useModal"

export default function Battleground(){

   const {userTeam, generateTeam, generateAdvTeam, cpuTeam, inBattle, setInBattle} = useContext(Context)
   
   const [isOpen, openModal, closeModal] = useModal(false)

   const [isSelected, setIsSelected] = useState(0)
   const [currentAdv, setCurrentAdv] = useState(0)
   const [userTurn, setUserTurn] = useState(true)
   const [battleTeam, setBattleTeam] = useState([...userTeam])
   const [battleCpuTeam, setBattleCpuTeam] = useState([...cpuTeam])
   const [cpuWin, setCpuWin] = useState(false)
   const [userWin, setUserWin] = useState(false)
   const [userLife, setUserLife] = useState([true, true, true])
   const [cpuLife, setCpuLife] = useState([true, true, true])
   
   const icons = `/icons/type_icons/class_icon_`

   function randomNumber(max, min){
      return (Math.floor((Math.random() * (max - min + 1)) + min))
  }
    
   useEffect(() => {
           
      generateTeam()
      generateAdvTeam()
   }, [])
   
   useEffect(() => {
      setBattleTeam([...userTeam])
      setBattleCpuTeam([...cpuTeam])
   }, [userTeam, cpuTeam])

   useEffect(() =>{
      if(!userTurn){
         setTimeout( () =>{
            cpuAutoAttack()}
         ,2000)
      }

      // ATAQUE AUTOMATICO CPU
      function cpuAutoAttack(){
         if(battleCpuTeam[currentAdv].stats[0].base_stat > 0){
            attackControl(battleCpuTeam[currentAdv], battleTeam[isSelected], battleCpuTeam[currentAdv].moveArray[randomNumber(1,0)])
         } else {
               setCurrentAdv(prevAdv => {
                  if(prevAdv !== 2){
                     return (prevAdv + 1)
                  } else {
                     setUserWin(true)
                     return 2
                  }
               })
               if(currentAdv !== 2){
                  setTimeout( () => {
                     attackControl(battleCpuTeam[currentAdv], battleTeam[isSelected], battleCpuTeam[currentAdv].moveArray[randomNumber(1,0)])
                  },1000)
               }
               //setUserTurn(!userTurn)
            }
      }
   },[userTurn])

   //Chequea que los pokomones puedan continuar peleando
   useEffect(() => {

      if(battleTeam.length === 3 && battleCpuTeam.length ===3){

         const userLose = battleTeam.filter(pokomon => pokomon.stats[0].base_stat !== 0)

         if(userLose.length === 0){
            setCpuWin(true)
            console.log("PERDISTE LOOSER")
         }
         const cpuLose = battleCpuTeam.filter(pokomon => pokomon.stats[0].base_stat !== 0)

         if(cpuLose.length === 0){
            setUserWin(true)
            console.log("GANASTE WINNER")
         }
      }
      
   }, [userTurn])
   
   function checkLife(){
      setUserLife(() =>{
         const userLive = battleTeam.map(pokomon => {
                           if(pokomon.stats[0].base_stat !== 0){
                              return true
                           } else return false
                        })
         return userLive
      } )

      setCpuLife(() =>{
         const cpuLive = battleCpuTeam.map(pokomon => {
                           if(pokomon.stats[0].base_stat !== 0){
                              return true
                           } else return false
                        })
         return cpuLive
      } )
      
      if(cpuLife === [false,false,false]){
         setUserWin(true)
      }
   }

   useEffect(() => {

      if(userWin){
      }
      if(cpuWin){
      }

   },[userWin,cpuWin])


   //Barra de vida 
   function hpBar(fullHp,leftHp){
      const lifeLeft = Math.floor((leftHp/fullHp)*100)
      return( `${lifeLeft}%`)
   }
   
  //Control de ataque, cambio de vida del defensor y manejo de turno
  function attackControl(attacker, defender, move){

   let damage = 0
   
   if(battleTeam.length === 3 && battleCpuTeam.length ===3){
      checkLife()
   }

   //Obtengo el daño causado por el ataque 
   if(attacker.stats[0].base_stat === 0){
      damage = 0
   } else damage = attack(attacker, defender, move)
      
   let hp = defender.stats[0].base_stat - damage
   if(hp < 0){
      hp = 0
   }
   
   //Actualizo la vida del pokomon que defiende
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

   //Cambio de turno
   checkLife()
   setUserTurn(prevTurn => !prevTurn)
  }
   
    
   return(
      battleTeam.length === 3 && battleCpuTeam.length === 3 && inBattle ?

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
               {battleCpuTeam.map( (pokemon, index) => (
                  <div className="cpuBenchPokemon" key={nanoid()} >
                     <img className="cpuBenchPokemon-img" src={pokemon.imageFront} style={{ filter: index === currentAdv ? "brightness(1)": "brightness(0)" }} alt="pokomon selected back" />
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
                     <div className="moves-button" onClick={userTurn && userLife[isSelected] ? () => attackControl(battleTeam[isSelected], battleCpuTeam[currentAdv], move ) : undefined} key={nanoid()} >
                        <img src={icons+`${move.type.toLowerCase()}.png`} alt="move icon" />
                        <h3>{move.name}</h3>
                        <h3>{move.power}</h3>
                     </div>
                  )}
               </div>

            </div>

         </div>
         
         <Modal isOpen={isOpen} close={closeModal}>
            
         </Modal>



      </div>
      : 
      <div className="load-battle main-battle">
         <button onClick={() => setInBattle(true)}>INICIAR BATALLA</button>
      </div>
        
    )
}