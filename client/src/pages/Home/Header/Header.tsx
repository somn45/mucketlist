import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import ClearTracks from './ClearTracks/ClearTracks';
import {
  activeGenres,
  clearGenres,
  clearTracks,
} from '../../../store/reducers/rootReducer';
import Logout from './Logout/Logout';
import { useCookies } from 'react-cookie';
import CustomTracks from './CustomTracks/CustomTracks';

const HeaderTab = styled.header`
  width: 100%;
  height: 80px;
  background-color: #20b2aa;
  position: fixed;
  left: 0;
  nav,
  MenuList {
    height: 100%;
  }
`;

const MenuList = styled.ul`
  padding: 20px 30px 0;
  display: flex;
  justify-content: space-between;
`;

function Header() {
  const dispatch = useDispatch();
  const [, , removeFirebaseUID] = useCookies(['firebaseUid']);
  const [, , removeAccessToken] = useCookies(['accessToken']);

  const initTracks = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(activeGenres(''));
    dispatch(clearTracks());
  };

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    removeFirebaseUID('firebaseUid');
    removeAccessToken('accessToken');
    localStorage.clear();
    window.location.reload();
  };
  return (
    <HeaderTab>
      <nav>
        <MenuList>
          <CustomTracks />
          <ClearTracks onClick={initTracks} />
          <Logout onClick={handleLogout} />
        </MenuList>
      </nav>
    </HeaderTab>
  );
}

export default Header;
