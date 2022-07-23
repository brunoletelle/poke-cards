import {useContext, useEffect, useState} from "react"
import { Context } from "../../Context"
import "./styles/Battleground.scss"
import { nanoid } from "nanoid"
import attack from "./functions/attack"
import Modal from "../../components/Modals/Modal"
import { useModal } from "../../hooks/useModal"

export default function Battleground(){

   const {userTeam, generateTeam, generateAdvTeam, cpuTeam, setCpuTeam, inBattle, setInBattle} = useContext(Context)
   
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

   const [userHit, setUserHit] = useState(false)
   const [cpuHit, setCpuHit] = useState(false)
   
   const icons = `/icons/type_icons/class_icon_`

   function randomNumber(max, min){
      return (Math.floor((Math.random() * (max - min + 1)) + min))
  }

  function beginBattle(){
           
   generateTeam()
   generateAdvTeam()
   setInBattle(true)

  }
  
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
            setCpuHit(false)
            setUserHit(true)
         } else {
            setCurrentAdv(prevAdv => {
               if(prevAdv !== 2){
                  setTimeout( () => {
                     attackControl(battleCpuTeam[prevAdv +1], battleTeam[isSelected], battleCpuTeam[currentAdv].moveArray[randomNumber(1,0)])
                     setUserTurn(!userTurn)
                     setCpuHit(false)
                     setUserHit(true)
                  },1000)
                     return (prevAdv + 1)
                  } else {
                     setUserWin(true)
                     return 2
                  }
               })
               if(currentAdv !== 2){
                  setTimeout( () => {
                     attackControl(battleCpuTeam[currentAdv], battleTeam[isSelected], battleCpuTeam[currentAdv].moveArray[randomNumber(1,0)])
                     setCpuHit(false)
                     setUserHit(true)
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
            openModal()
         }
         const cpuLose = battleCpuTeam.filter(pokomon => pokomon.stats[0].base_stat !== 0)

         if(cpuLose.length === 0){
            setUserWin(true)
            openModal()
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

   //Barra de vida 
   function hpBar(fullHp,leftHp){
      const lifeLeft = Math.floor((leftHp/fullHp)*100)
      return( `${lifeLeft}%`)
   }
   
   function userAttack(attacker, defender, move){
      if(attacker.stats[0].base_stat !==0){
         setCpuHit(true)
         setUserHit(false)
         attackControl(attacker,defender,move)
      }
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
         return
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
      setUserTurn(!userTurn)
  }

  function reboot(){
      closeModal()

      setUserWin(false)
      setCpuWin(false)

      setCpuLife([true,true,true])
      setUserLife([true, true, true])

      setCpuTeam([])
      setInBattle(false)

      setCurrentAdv(0)
      setIsSelected(0)

      setUserTurn(true)

      setCpuHit(false)
      setUserHit(false)

   }
    
   return(
      battleTeam.length === 3 && battleCpuTeam.length === 3 && inBattle ?

      <div className="main-battle" style={{backgroundImage: "url(../background/background-team.png)"}}>
         <div className="battle-container">
            <div className="battle-background" style={{backgroundImage: "url(../background/gym.png)"}}>
               <img className={userHit ? "userPokemon-img damaged" : "userPokemon-img"} src={battleTeam[isSelected].imageBack} alt="pokomon selected back" />

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

               <img className={cpuHit ? "pcPokemon-img damaged" : "pcPokemon-img"} src={cpuTeam[currentAdv].imageFront} alt="pokomon selected front" />

               <div className="currentAdv-info">
                  <div className="selected-info-container">
                     <div className="progress-bar">
                        <div style={{width: hpBar(cpuTeam[currentAdv].stats[0].base_stat,battleCpuTeam[currentAdv].stats[0].base_stat)}}>
                           { /* battleCpuTeam[currentAdv].stats[0].base_stat */}
                        </div>
                     </div>
                     <h2 style={{color: !userTurn ? "lightgreen" : "black" }}>{battleCpuTeam[currentAdv].name.toUpperCase()}</h2>
                  </div>
               </div>

               <div className="selected-info">
                  <div className="selected-info-container">
                     <h2 style={{color: userTurn ? "lightgreen" : "black" }}>{battleTeam[isSelected].name.toUpperCase()}</h2>
                     <div className="progress-bar">
                        <div style={{width: hpBar(userTeam[isSelected].stats[0].base_stat,battleTeam[isSelected].stats[0].base_stat)}}>
                           {/* battleTeam[isSelected].stats[0].base_stat */}
                        </div>
                     </div>
                  </div>

                  <div className="moves">
                     {battleTeam[isSelected].moveArray.map( move =>
                        <div className="moves-button" onClick={userTurn && userLife[isSelected] ? () => userAttack(battleTeam[isSelected], battleCpuTeam[currentAdv], move ) : undefined} key={nanoid()} >
                           <img src={icons+`${move.type.toLowerCase()}.png`} alt="move icon" />
                           <h3>{move.name.toUpperCase()}</h3>
                           <h3>{move.power}</h3>
                        </div>
                     )}
                  </div>

               </div>

            </div>
         </div>
         

         <Modal isOpen={isOpen} close={closeModal} hideClose={true}>
            <div className="modal-battle">
               <img src={ userWin ? "https://c.tenor.com/kYWeox8OKvAAAAAC/pokemon-squirtle.gif" : 
                                    "https://c.tenor.com/53miymrFe_UAAAAC/hold-on.gif"} alt="win or lose gif" />
               <h2>{userWin ? "Felicitaciones!\nHas ganado la batalla" : "Te vencieron! Pero puedes jugar otra vez"}</h2>
               <button onClick={() => reboot()}>Volver</button>
            </div>
         </Modal>

      </div>
      : 
      <div className="load-battle main-battle" style={{backgroundImage: "url(../background/background-team.png)"}}>
         <div className="load-battle-msj">
            <h3>Antes de comenzar puedes comprar packs de cartas en el Market y puedes seleccionar tu equipo en la Pokodex</h3>
            <button onClick={() => beginBattle()}>INICIAR BATALLA</button>
         </div>
      </div>
        
    )
}