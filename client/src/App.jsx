import React from "react";
import Home from "./components/Home";
import Details from "./components/Details.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Update from "./components/Update.jsx";
import Click from "./components/Click.jsx";
import Login from "./components/Login.jsx";
import './App.css'
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/click" element={<Click />} />
          <Route path='/update/:id' element={<Update/>}/>
          <Route path='login' element={<Login/>}/>
        </Routes>
        <Details />
      </BrowserRouter>
    </>
  );
}

export default App;
