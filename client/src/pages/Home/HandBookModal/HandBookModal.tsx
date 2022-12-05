import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
import { inactiveAll } from '../../../store/reducers/rootReducer';
import { Modal } from '../../../utils/styles/Modal';
import HandBookAddCustomTrack from './HandBookAddCustomTrack/HandBookAddCustomTrack';
import HandBookBody from './HandBookBody/HandBookBody';
import HandBookClearTracks from './HandBookClearTracks/HandBookClearTracks';
import HandBookCustomTrack from './HandBookCustomTrack/HandBookCustomTrack';
import HandBookLogOut from './HandBookLogout.tsx/HandBookLogOut';
import HandBookPlayer from './HandBookPlayer/HandBookPlayer';

export interface IMediaQuery {
  isMobile?: boolean;
  isTablet?: boolean;
}

const HandBookWrap = styled(Modal)`
  width: 100%;
  color: white;
  display: flex;
  flex-direction: column;
  span {
    font-size: 13px;
  }
`;

const ContentLayout = styled.div<IMediaQuery>`
  width: ${(props) =>
    props.isMobile ? '100%' : props.isTablet ? '484px' : '640px'};
  height: ${(props) =>
    props.isMobile ? '100%' : props.isTablet ? '734px' : '734px'};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const HandBookHead = styled.h2`
  font-size: 18px;
  margin-bottom: 40px;
`;

const HandBookFoot = styled.span`
  width: 340px;
`;

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
  const isMobile = useMediaQuery({
    query: '(max-width: 767px)',
  });
  const isTablet = useMediaQuery({
    query: '(max-width: 1023px)',
  });
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
      <ContentLayout isMobile={isMobile} isTablet={isTablet}>
        {activeGuide === 'main' && (
          <>
            <HandBookHead>MucketList 이용 가이드</HandBookHead>
            <HandBookBody />
          </>
        )}
        {activeGuide === 'player' && <HandBookPlayer />}
        {activeGuide === 'addCustomTrack' && <HandBookAddCustomTrack />}
        {activeGuide === 'clearTracks' && <HandBookClearTracks />}
        {activeGuide === 'ending' && (
          <HandBookFoot>
            이것으로 MucketList 안내가 종료되었습니다. 다시 한번 안내가 필요한
            경우 상단의 책모양 아이콘을 누르면 가이드가 실행됩니다. 이제
            MucketList을 즐겨주십시오!
          </HandBookFoot>
        )}
      </ContentLayout>
      {activeGuide === 'customTrack' && <HandBookCustomTrack />}
      {activeGuide === 'logout' && <HandBookLogOut />}
    </HandBookWrap>
  );
}

export default HandBookModal;
