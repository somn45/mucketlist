import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import OptionModalWrap from './ModalWrap/OptionModalWrap';
import OptionModalForm from './Form/OptionModalForm';
import OptionModalItem from './InputItem/OptionModalItem';
import OptionModalSubmit from './Submit/OptionModalSubmit';
import OptionModalTitle from './Title/OptionModalTitle';

import {
  activeHandBook,
  inactiveAll,
  RootState,
  sortByPopularity,
  sortByRandom,
  sortByRelease,
  updateStatusMessage,
} from '../../../store/reducers/rootReducer';
import isArrayEmpty from '../../../utils/functions/isArrayEmpty';
import getToken from '../../../utils/functions/getToken';

const NEW_USER_HAND_BOOK = getToken('newUserHandBook');

function OptionModal() {
  const dispatch = useDispatch();
  const { tracks } = useSelector((state: RootState) => state);
  const isActive = useSelector((state: RootState) => state.activeComponent);
  const [selectedSetting, setSelectedSetting] = useState('');

  const setTrackOption = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (isArrayEmpty(tracks)) return;
    dispatchBySelectedSetting(selectedSetting);
    NEW_USER_HAND_BOOK ? dispatch(activeHandBook()) : dispatch(inactiveAll());
    dispatch(updateStatusMessage('트랙 검색이 완료되었습니다.'));
  };

  const dispatchBySelectedSetting = (selectedSetting: string) => {
    const trackOptions = new Map();
    trackOptions.set('popularity', dispatch(sortByPopularity()));
    trackOptions.set('date', dispatch(sortByRelease()));
    trackOptions.set('random', dispatch(sortByRandom()));
    trackOptions.get(selectedSetting);
  };

  return (
    <OptionModalWrap isActive={isActive.options}>
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
    </OptionModalWrap>
  );
}

export default OptionModal;
