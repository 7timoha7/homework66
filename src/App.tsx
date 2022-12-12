import React from 'react';
import './App.css';
import MainCalories from "./components/MainCalories/MainCalories";
import {Link, Route, Routes} from "react-router-dom";
import FormCalories from "./components/FormCalories/FormCalories";

function App() {
  return (
    <div className="App">
      <div>
        <Link to={"/"}><h1>Calories tracer</h1></Link>
      </div>
      <div>
        <Routes>
          <Route path={"/"} element={(
            <MainCalories/>
          )}/>
          <Route path={"form/:addEdit"} element={(
            <FormCalories/>
          )}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
