import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';

import Genre from '../../../../components/Genre';

import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/reducers/rootReducer';
import { getSpotifyGenres } from '../../../../API';

const GenreSelectionTabStyle = styled.div`
  width: 335px;
  height: 365px;
  overflow: scroll;
  overflow-x: hidden;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(5, 1fr);
  row-gap: 10px;
  margin-bottom: 30px;
  justify-content: space-between;
`;

function GenreModalCheckBoxList() {
  const getGenres = async () => {
    const genres = await getSpotifyGenres();
    return genres;
  };

  const {
    isLoading,
    isError,
    data: spotifyGenresData,
    error,
  } = useQuery('genres', getGenres, {
    retry: 3,
  });

  if (isLoading) return <div>장르 로딩 중...</div>;

  return (
    <GenreSelectionTabStyle>
      {spotifyGenresData &&
        spotifyGenresData.map((genre) => <Genre key={genre} genre={genre} />)}
    </GenreSelectionTabStyle>
  );
}

export default React.memo(GenreModalCheckBoxList);
