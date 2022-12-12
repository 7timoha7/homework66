import React from 'react';
import './App.css';
import MainCalories from "./components/MainCalories/MainCalories";
import {Link, Route, Routes} from "react-router-dom";
import FormCalories from "./components/FormCalories/FormCalories";
import {Navbar} from "react-bootstrap";

function App() {
  return (
    <div className="container-fluid">
      <Navbar>
        <Link className="nav-link" to={"/"}><h1>Calories tracer</h1></Link>
      </Navbar>
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
