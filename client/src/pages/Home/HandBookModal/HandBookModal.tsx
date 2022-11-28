import React, { useState } from 'react';
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
    <HandBookCustomTrack />,
    <HandBookClearTracks />,
    <HandBookLogOut />,
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
