import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { inactiveAll } from '../../../store/reducers/rootReducer';
import { Modal } from '../../../utils/styles/Modal';
import HandBookAddCustomTrack from './HandBookAddCustomTrack/HandBookAddCustomTrack';
import HandBookBody from './HandBookBody/HandBookBody';
import HandBookClearTracks from './HandBookClearTracks/HandBookClearTracks';
import HandBookCustomTrack from './HandBookCustomTrack/HandBookCustomTrack';
import HandBookLogOut from './HandBookLogout.tsx/HandBookLogOut';
import HandBookPlayer from './HandBookPlayer/HandBookPlayer';

const HandBookWrap = styled(Modal)`
  width: 100%;
  color: white;
  display: flex;
  flex-direction: column;
  span {
    font-size: 13px;
  }
`;

const HandBookHead = styled.h2`
  font-size: 18px;
  margin-bottom: 40px;
`;

const HandBookFoot = styled.span``;

const HANDBOOK_GUIDESTEP = [
  'main',
  'player',
  'addCustomTrack',
  'customTrack',
  'clearTracks',
  'logout',
  'ending',
];

function HandBookModal() {
  const dispatch = useDispatch();
  const [guideStep, setGuideStep] = useState(0);
  const [activeGuide, setActiveGuide] = useState('main');
  const [, , removeCookie] = useCookies(['newUserHandBook']);

  useEffect(() => {
    setActiveGuide(HANDBOOK_GUIDESTEP[guideStep]);
  }, [guideStep]);

  const stepToStepHandBook = (e: React.MouseEvent<HTMLDivElement>) => {
    setGuideStep((prevState) => prevState + 1);
    if (activeGuide === 'ending') {
      dispatch(inactiveAll());
      removeCookie('newUserHandBook');
    }
  };
  return (
    <HandBookWrap onClick={(e) => stepToStepHandBook(e)}>
      {activeGuide === 'main' && (
        <>
          <HandBookHead>MucketList 이용 가이드</HandBookHead>
          <HandBookBody />
        </>
      )}
      {activeGuide === 'player' && <HandBookPlayer />}
      {activeGuide === 'addCustomTrack' && <HandBookAddCustomTrack />}
      {activeGuide === 'customTrack' && <HandBookCustomTrack />}
      {activeGuide === 'clearTracks' && <HandBookClearTracks />}
      {activeGuide === 'logout' && <HandBookLogOut />}
      {activeGuide === 'ending' && (
        <HandBookFoot>
          이것으로 MucketList 안내가 종료되었습니다. 다시 한번 안내가 필요한
          경우 상단의 책모양 아이콘을 누르면 가이드가 실행됩니다. 이제
          MucketList을 즐겨주십시오!
        </HandBookFoot>
      )}
    </HandBookWrap>
  );
}

export default HandBookModal;
