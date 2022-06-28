import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import Home from './pages/Home';
import Login from './pages/Login';
import Join from './pages/Join';
import Header from './pages/Header';

const cookies = new Cookies();

function App() {
  return (
    <Router>
      {cookies.get('uid') ? <Header /> : null}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Join" element={<Join />} />
      </Routes>
    </Router>
  );
}

export default App;
