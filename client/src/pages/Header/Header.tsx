import React from 'react';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import {
  faList,
  faQuestion,
  faRightFromBracket,
  faRotateRight,
} from '@fortawesome/free-solid-svg-icons';

import HeaderItem from './HeaderItem/HeaderItem';

import {
  activeGenres,
  activeHandBook,
  clearTracks,
} from '../../store/reducers/rootReducer';
import { MOBILE_SIZE } from '../../constants/constants';
import HeaderWrap from './HeaderWrap/HeaderWrap';
import MenuList from './MenuList/MenuList';
import getToken from '../../utils/functions/getToken';
import { requestLogout } from '../../API';

function Header() {
  const dispatch = useDispatch();
  const [, , removeFirebaseUID] = useCookies(['firebaseUid']);
  const navigate = useNavigate();
  const isMobile = useMediaQuery({
    query: MOBILE_SIZE,
  });

  const moveCustomTrackListModal = () => {
    navigate('/tracks/custom');
  };

  const initTracks = () => {
    dispatch(activeGenres());
    dispatch(clearTracks());
  };

  const handleActiveHandBook = () => {
    dispatch(activeHandBook());
  };

  const handleLogout = async () => {
    const firebaseUid = getToken('firebaseUid');
    await requestLogout(firebaseUid);
    removeFirebaseUID('firebaseUid');
    localStorage.clear();
    window.location.reload();
  };

  return (
    <HeaderWrap>
      <nav>
        <MenuList>
          <HeaderItem
            text="찜한 트랙 목록"
            onClick={moveCustomTrackListModal}
            icon={faList}
            isMobile={isMobile}
          />
          <HeaderItem
            text="트랙 초기화"
            onClick={initTracks}
            icon={faRotateRight}
            isMobile={isMobile}
          />
          <HeaderItem
            text="도움말"
            onClick={handleActiveHandBook}
            icon={faQuestion}
            isMobile={isMobile}
          />
          <HeaderItem
            text="로그아웃"
            onClick={handleLogout}
            icon={faRightFromBracket}
            isMobile={isMobile}
          />
        </MenuList>
      </nav>
    </HeaderWrap>
  );
}

export default React.memo(Header);
