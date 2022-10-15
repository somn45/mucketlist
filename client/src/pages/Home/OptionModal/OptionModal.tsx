import { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import {
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

interface OptionModalState {
  tracks: TrackState[];
  activeComponent: {
    genres: boolean;
    options: boolean;
  };
}

interface OptionModalProps {
  tracks: TrackState[];
  isActive: {
    genres: boolean;
    options: boolean;
  };
}

function OptionModal({ tracks, isActive }: OptionModalProps) {
  const dispatch = useDispatch();
  const [selectedSetting, setSelectedSetting] = useState('');

  const setTrackOption = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (isArrayEmpty(tracks)) return;
    if (selectedSetting === 'popularity') {
      dispatch(sortByPopularity(''));
    } else if (selectedSetting === 'date') {
      dispatch(sortByRelease(''));
    } else if (selectedSetting === 'random') {
      dispatch(sortByRandom(''));
    }
    dispatch(addSettings(selectedSetting));
    dispatch(inactiveAll(''));
    dispatch(
      updateStatusMessage(
        '트랙 검색이 완료되었습니다. 이제 음악의 재생이 가능합니다.'
      )
    );
  };
  return (
    <>
      {isActive.options && (
        <Modal>
          <OptionModalForm>
            <OptionModalTitle />
            <OptionModalItem
              optionName="popularity"
              checked={selectedSetting === 'popularity'}
              onChange={(e) => setSelectedSetting(e.target.name)}
              labelText="인기순"
            />
            <OptionModalItem
              optionName="date"
              checked={selectedSetting === 'date'}
              onChange={(e) => setSelectedSetting(e.target.name)}
              labelText="발매순"
            />
            <OptionModalItem
              optionName="random"
              checked={selectedSetting === 'random'}
              onChange={(e) => setSelectedSetting(e.target.name)}
              labelText="랜덤 정렬"
            />
            <OptionModalSubmit onClick={setTrackOption} />
          </OptionModalForm>
        </Modal>
      )}
    </>
  );
}

function mapStateToProps(state: OptionModalState) {
  return {
    tracks: state.tracks,
    isActive: state.activeComponent,
  };
}

export default connect(mapStateToProps)(OptionModal);
