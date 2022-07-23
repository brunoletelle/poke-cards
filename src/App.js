import "./App.scss"
import React from "react"
import NavBar from "./components/NavBar/NavBar"
import Home from "./pages/Home/Home"
import Pokodex from "./pages/Pokodex/Pokodex"
import Market from "./pages/Market/Market"
import Battleground from "./pages/Battleground/Battleground"
import Carta from "./components/Cards/Carta"
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
