import React from 'react';
import { useCookies } from 'react-cookie';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import CustomPlayList from './CustomPlayList';

function Header() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['F_UID']);
  const [aCookies, aSetCookie, aRemoveCookie] = useCookies(['accessToken']);
  const onClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    removeCookie('F_UID');
    aRemoveCookie('accessToken');
    localStorage.clear();
    window.location.reload();
  };
  const showDbisTracks = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
  };
  return (
    <>
      <ul>
        <li>
          <span onClick={onClick}>로그아웃</span>
        </li>
        <li>
          <Link to="/track/custom">찜한 플레이리스트</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/track/custom" element={<CustomPlayList />} />
      </Routes>
    </>
  );
}

export default Header;
