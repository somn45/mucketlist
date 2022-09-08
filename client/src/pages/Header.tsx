import React from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { activeGenres, clearTracks } from '../store/reducers/rootReducer';

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

const MenuItem = styled.li`
  * {
    width: 25px;
    height: 25px;
  }
  Link,
  LogoutButton {
    padding: 5px;
  }
`;

const LogoutButton = styled.div`
  cursor: pointer;
`;

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [, , removeFirebaseUID] = useCookies(['F_UID']);
  const [, , removeAccessToken] = useCookies(['accessToken']);
  const handleLogout = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    removeFirebaseUID('F_UID');
    removeAccessToken('accessToken');
    localStorage.clear();
    window.location.reload();
  };
  const initTrack = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    dispatch(activeGenres(''));
    dispatch(clearTracks(''));
  };
  return (
    <HeaderTab>
      <nav>
        <MenuList>
          <MenuItem>
            <Link title="찜한 트랙 리스트" to="/track/custom">
              <FontAwesomeIcon icon={faList} />
            </Link>
          </MenuItem>
          <MenuItem>
            <div onClick={initTrack}>트랙 초기화</div>
          </MenuItem>
          <MenuItem>
            <LogoutButton title="로그아웃" onClick={handleLogout}>
              <FontAwesomeIcon icon={faRightFromBracket} />
            </LogoutButton>
          </MenuItem>
        </MenuList>
      </nav>
    </HeaderTab>
  );
}

export default Header;
