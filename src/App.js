import "./App.scss"
import React from "react"
import NavBar from "./components/NavBar"
import Home from "./components/Home"
import Team from "./components/Team"
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
        <Route exact path="/team" element={<Team/>} />
      </Routes>
    </Router>
    </ContextProvider>
  )
}
