import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import HandBookAddCustomTrack from './HandBookAddCustomTrack/HandBookAddCustomTrack';
import HandBookBody from './HandBookBody/HandBookBody';
import HandBookClearTracks from './HandBookClearTracks/HandBookClearTracks';
import HandBookCustomTracks from './HandBookCustomTracks/HandBookCustomTracks';
import HandBookLogout from './HandBookLogout/HandBookLogout';
import HandBookPlayer from './HandBookPlayer/HandBookPlayer';

import { HandBookWrap } from '../../../styles/modal/modalStyle';
import { IMediaQuery } from '../../../types/mediaQueryTypes/mediaQueryTypes';

import { inactiveAll } from '../../../store/reducers/rootReducer';

export const ContentLayout = styled.div<IMediaQuery>`
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

function HandBookModal() {
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const [, , removeCookie] = useCookies(['newUserHandBook']);
  const HandBookMain = () => (
    <>
      <HandBookHead>MucketList 이용 가이드</HandBookHead>
      <HandBookBody />
    </>
  );

  const HandBookEndMessage =
    '이것으로 MucketList 안내가 종료되었습니다. 다시 한번 안내가 필요한 경우 상단의 책모양 아이콘을 누르면 가이드가 실행됩니다. 이제 MucketList을 즐겨주십시오!';
  const HandBookFooter = () => (
    <HandBookFoot>{HandBookEndMessage}</HandBookFoot>
  );
  const handBookStep = [
    <HandBookMain />,
    <HandBookPlayer />,
    <HandBookAddCustomTrack />,
    <HandBookCustomTracks />,
    <HandBookClearTracks />,
    <HandBookLogout />,
    <HandBookFooter />,
  ];

  const stepToStepHandBook = (e: React.MouseEvent<HTMLDivElement>) => {
    setActiveStep((prevState) => prevState + 1);
    if (activeStep === handBookStep.length - 1) {
      dispatch(inactiveAll());
      removeCookie('newUserHandBook');
    }
  };
  return (
    <HandBookWrap onClick={(e) => stepToStepHandBook(e)}>
      {handBookStep[activeStep]}
    </HandBookWrap>
  );
}

export default HandBookModal;
