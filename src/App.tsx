import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { NavLink, Route, Router, Routes } from "react-router-dom";
import AudienceList from "./Pages/AudienceList";
import CreateEquip from "./Pages/CreateEquip";

const App =() =>{
  return (
      <div className="App">
      <nav style={{height: '10%'}}>
        <ul className="padding-inline-start">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/audienceList">Audicence</NavLink>
          <NavLink to="/createEquip">Equipment</NavLink>
        </ul>
      </nav>
      <Routes>
        <Route path="/"/>
        <Route path="/audienceList" element={<AudienceList/>}/>
        <Route path="/createEquip" element={<CreateEquip/>}/>
        
      </Routes>
      </div>
  );
}

export default App;
