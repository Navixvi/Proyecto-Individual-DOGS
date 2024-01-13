import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './view/Home';
import LandingPage from './view/LandingPage';
import Detail from './view/Detail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </Router>
  );
}

export default App;
