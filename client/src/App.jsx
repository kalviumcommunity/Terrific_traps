import React from "react";
import Home from "./components/Home";
import Details from "./components/Details.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Click from "./components/Click.jsx";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/click" element={<Click />} />
        </Routes>
        <Details />
      </BrowserRouter>
    </>
  );
}

export default App;
