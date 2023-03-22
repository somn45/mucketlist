import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import Join from './pages/Account/Join/Join';
import Login from './pages/Account/Login/Login';

import SpotifyAuth from './SpotifyAuth';
import GlobalStyles from './GlobalStyles';
import Home from './pages/Home/Home';
import CustomTrackList from './pages/CustomTrackList/CustomTrackList';

function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <SpotifyAuth />
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/tracks/custom" element={<CustomTrackList />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/Join" element={<Join />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
