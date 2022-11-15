import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import styled, { css, keyframes } from 'styled-components';
import {
  activeHandBook,
  addSettings,
  inactiveAll,
  sortByPopularity,
  sortByRandom,
  sortByRelease,
  updateStatusMessage,
} from '../../../store/reducers/rootReducer';
import isArrayEmpty from '../../../utils/functions/isArrayEmpty';
import { TrackState } from '../TrackList/TrackList';
import OptionModalForm from './Form/OptionModalForm';

import OptionModalItem from './InputItem/OptionModalItem';
import OptionModalSubmit from './Submit/OptionModalSubmit';
import OptionModalTitle from './Title/OptionModalTitle';
import { Modal } from '../../../utils/styles/Modal';
import { Cookies } from 'react-cookie';

interface OptionModalState {
  tracks: TrackState[];
  activeComponent: {
    genres: boolean;
    options: boolean;
    handBook: boolean;
  };
}

interface OptionModalProps {
  tracks: TrackState[];
  isActive: {
    genres: boolean;
    options: boolean;
    handBook: boolean;
  };
}

const FadeIn = keyframes`
  0% {
    opacity: 0;
  } 100% {
    opacity: 1;
  }
`;

const FadeOut = keyframes`
  0% {
    opacity: 1;
  } 100% {
    opacity: 0;
  }
`;

const OpenModalWrap = styled(Modal)<{ isActive: boolean }>`
  animation: ${(props) =>
    props.isActive
      ? css`
          ${FadeIn} 0.6s linear forwards
        `
      : css`
          ${FadeOut} 0.6s linear forwards
        `};
`;

const cookies = new Cookies();

function OptionModal({ tracks, isActive }: OptionModalProps) {
  const dispatch = useDispatch();
  const [selectedSetting, setSelectedSetting] = useState('');
  const [isActiveOptionModal, setIsActiveOptionModal] = useState(false);

  useEffect(() => {
    setIsActiveOptionModal(true);
  }, []);

  const setTrackOption = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (isArrayEmpty(tracks)) return;
    if (selectedSetting === 'popularity') {
      dispatch(sortByPopularity());
    } else if (selectedSetting === 'date') {
      dispatch(sortByRelease());
    } else if (selectedSetting === 'random') {
      dispatch(sortByRandom());
    }
    dispatch(addSettings(selectedSetting));
    setTimeout(() => setIsActiveOptionModal(false), 600);
    if (cookies.get('newUserHandBook')) dispatch(activeHandBook());
    else dispatch(inactiveAll());
    dispatch(updateStatusMessage('트랙 검색이 완료되었습니다.')); 
  }
  return (
    <OpenModalWrap isActive={isActiveOptionModal}>
      <OptionModalForm>
        <OptionModalTitle />
        <OptionModalItem
          name="popularity"
          checked={selectedSetting === 'popularity'}
          onChange={(e) => {
            setSelectedSetting(e.target.name);
          }}
          text="인기순"
        />
        <OptionModalItem
          name="date"
          checked={selectedSetting === 'date'}
          onChange={(e) => setSelectedSetting(e.target.name)}
          text="발매순"
        />
        <OptionModalItem
          name="random"
          checked={selectedSetting === 'random'}
          onChange={(e) => setSelectedSetting(e.target.name)}
          text="랜덤 정렬"
        />
        <OptionModalSubmit onClick={setTrackOption} />
      </OptionModalForm>
    </OpenModalWrap>
  );
}

function mapStateToProps(state: OptionModalState) {
  return {
    tracks: state.tracks,
    isActive: state.activeComponent,
  };
}

export default connect(mapStateToProps)(OptionModal);
