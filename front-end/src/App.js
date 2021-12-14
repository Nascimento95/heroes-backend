import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import Nav from './Components/Nav'
import Home from './Pages/Home';
import List from './Pages/List';
import OneHeros from './Pages/OneHeros';
import './App.css'
const App = () => {
  return (
    <div className="back">
      <BrowserRouter>
      <Nav />
        <Routes>
          <Route exact path="/a" element={<Home/>} />
          <Route exact path="/heroes" element={<List/>} />
          <Route exact path="heroes/:slug" element={<OneHeros/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;