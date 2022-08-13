import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import Home from './pages/Home';
import Login from './pages/Login';
import Join from './pages/Join';
import Header from './pages/Header';
import SpotifyAuth from './SpotifyAuth';
import CustomPlayList from './pages/CustomPlayList';
import GlobalStyles from './GlobalStyles';

const cookies = new Cookies();

function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <SpotifyAuth />
        {cookies.get('F_UID') ? <Header /> : null}
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/track/custom" element={<CustomPlayList />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/Join" element={<Join />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
