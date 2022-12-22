import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import Login from './pages/Login/Login';
import Join from './pages/Join/Join';

import SpotifyAuth from './SpotifyAuth';
import CustomPlayList from './pages/CustomPlayList/CustomPlayList';
import GlobalStyles from './GlobalStyles';
import Home from './pages/Home/Home';

const cookies = new Cookies();

function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <SpotifyAuth />
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/tracks/custom" element={<CustomPlayList />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/Join" element={<Join />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
