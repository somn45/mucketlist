import React, { useState } from 'react';

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
  const [selectedSetting, setSelectedSetting] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = e.target.value;
    setSelectedSetting(e.target.value);
  };
  const onClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (tracks.length === 0 && !Array.isArray(tracks)) return;
    let sortedTracks;
    if (selectedSetting === 'popularity') {
      sortedTracks = tracks.sort((a, b) => {
        if (a.popularity > b.popularity) return 1;
        else if (b.popularity > a.popularity) return -1;
        else return 0;
      });
    } else if (selectedSetting === 'random') {
      sortedTracks = tracks.sort((a, b) => {
        const randomNumber1 = Math.random();
        const randomNumber2 = Math.random();
        if (randomNumber1 > randomNumber2) return 1;
        else if (randomNumber2 > randomNumber1) return -1;
        else return 0;
      });
    } else if (selectedSetting === 'date') {
      sortedTracks = tracks.sort((a, b) => {
        if (a.album.release_date > b.album.release_date) return 1;
        else if (b.album.release_date > a.album.release_date) return -1;
        else return 0;
      });
    }
    localStorage.setItem('tracks', JSON.stringify(sortedTracks));
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

export default Settings;
