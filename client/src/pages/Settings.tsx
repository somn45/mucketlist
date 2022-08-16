import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
  sortByPopularity,
  sortByRelease,
  sortByRandom,
  addSettings,
} from '../store/reducers/rootReducer';
import { FormFrame } from '../utils/styles/FormFrame';
import { Modal } from '../utils/styles/Modal';

export interface AlbumImage {
  height: number;
  url: string;
  width: number;
}

export interface Artist {
  name: string;
  id: string;
  external_urls: {
    spotify: string;
  };
}

export interface TrackState {
  id: string;
  name: string;
  popularity: number;
  artists: Artist[];
  album: {
    images: AlbumImage[];
    release_date: string;
  };
}

export interface ITracks {
  tracks: TrackState[];
}

export interface TrackSeed {
  id: string;
  type: string;
}

export interface TrackData {
  tracks: TrackState[];
  seeds: TrackSeed[];
}

const SettingsForm = styled(FormFrame)``;

const InputTab = styled.div`
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  flex-direction: row;
  input {
    display: none;
  }
  label {
    width: 18px;
    height: 18px;
    margin-right: 5px;
    border: 3px solid black;
    border-radius: 50%;
    cursor: pointer;
  }
  input:checked + label {
    background-color: #7fffd4;
  }
`;

const Submit = styled.input`
  width: 250px;
  height: 50px;
  border: 0;
  border-radius: 5px;
  background-color: #20b2aa;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
`;

function Settings({ tracks }: ITracks) {
  const dispatch = useDispatch();
  const [selectedSetting, setSelectedSetting] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = e.target.value;
    setSelectedSetting(selectedValue);
  };
  const setTrackOption = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (tracks.length === 0 && !Array.isArray(tracks)) return;
    if (selectedSetting === 'popularity') {
      dispatch(sortByPopularity(''));
    } else if (selectedSetting === 'date') {
      dispatch(sortByRelease(''));
    } else if (selectedSetting === 'random') {
      dispatch(sortByRandom(''));
    }
    dispatch(addSettings(selectedSetting));
  };
  return (
    <Modal>
      <SettingsForm>
        <h2>트랙의 재생 순서를 선택하세요</h2>
        <InputTab>
          <input
            type="radio"
            id="popularity"
            value="popularity"
            checked={selectedSetting === 'popularity'}
            onChange={handleChange}
          />
          <label htmlFor="popularity"></label>
          <span> 인기순</span>
        </InputTab>
        <InputTab>
          <input
            type="radio"
            id="date"
            value="date"
            checked={selectedSetting === 'date'}
            onChange={handleChange}
          />
          <label htmlFor="date"></label>
          <span>발매순</span>
        </InputTab>
        <InputTab>
          <input
            type="radio"
            id="random"
            value="random"
            checked={selectedSetting === 'random'}
            onChange={handleChange}
          />
          <label htmlFor="random"></label>
          <span>랜덤</span>
        </InputTab>
        <Submit
          type="submit"
          value="음악 재생 순서 결정"
          onClick={setTrackOption}
        />
      </SettingsForm>
    </Modal>
  );
}

const mapStateToProps = (state: ITracks) => {
  return { tracks: state.tracks };
};

export default connect(mapStateToProps)(Settings);
