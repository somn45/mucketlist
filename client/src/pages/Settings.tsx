import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import {
  sortByPopularity,
  sortByRelease,
  sortByRandom,
  addSettings,
} from '../store/store';

export interface AlbumImage {
  height: number;
  url: string;
  width: number;
}

export interface TrackState {
  id: string;
  name: string;
  popularity: number;
  album: {
    images: AlbumImage[];
    release_date: string;
  };
}

export interface ITracks {
  tracks: TrackState[];
}

function Settings({ tracks }: ITracks) {
  const dispatch = useDispatch();
  const [selectedSetting, setSelectedSetting] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = e.target.value;
    setSelectedSetting(selectedValue);
  };
  const onClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (tracks.length === 0 && !Array.isArray(tracks)) return;
    if (selectedSetting === 'popularity') {
      dispatch(sortByPopularity(''));
    } else if (selectedSetting === 'date') {
      dispatch(sortByRelease(''));
    } else if (selectedSetting === 'random') {
      dispatch(sortByRandom(''));
    }
    localStorage.setItem('tracks', JSON.stringify(tracks));
    dispatch(addSettings(selectedSetting));
  };
  return (
    <form>
      <input
        type="radio"
        value="popularity"
        checked={selectedSetting === 'popularity'}
        onChange={handleChange}
      />
      인기순
      <input
        type="radio"
        value="date"
        checked={selectedSetting === 'date'}
        onChange={handleChange}
      />
      발매순
      <input
        type="radio"
        value="random"
        checked={selectedSetting === 'random'}
        onChange={handleChange}
      />
      랜덤
      <input type="submit" value="음악 재생 순서 결정" onClick={onClick} />
    </form>
  );
}

const mapStateToProps = (state: ITracks) => {
  return { tracks: state.tracks };
};

export default connect(mapStateToProps)(Settings);
