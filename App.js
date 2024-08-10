
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react'
import Home from './home';
import Login from './Login';
import Game from './Gamed';
//import Token from './getToken';

const App = () => {
  
  return (
    <div className="App">
    <BrowserRouter>
          <Routes>
              <Route path={"/home"} element={<Home />}></Route>
              <Route path={"/login"} element={<Login />}></Route>
              <Route path={"/game"} element={<Game />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;