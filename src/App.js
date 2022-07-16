import "./App.scss"
import React from "react"
import NavBar from "./components/NavBar"
import Home from "./components/Home"
import Pokodex from "./components/Pokodex"
import Market from "./components/Market"
import Battleground from "./components/Battleground"
import Carta from "./components/Carta"
import { ContextProvider } from "./Context"

import {BrowserRouter as Router} from 'react-router-dom';
import {Route, Routes} from 'react-router-dom';

export default function App(){
  
  return(
    <ContextProvider>
    <Router>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/pokodex" element={<Pokodex/>} />
        <Route exact path="/market" element={<Market/>} />
        <Route exact path="/battleground" element={<Battleground/>} />
        <Route exact path="/card" element={<Carta/>} />
      </Routes>
    </Router>
    </ContextProvider>
  )
}
