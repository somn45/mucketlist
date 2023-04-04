import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useQuery } from 'react-query';

import Genre from '../../../../components/Genre';

import getToken from '../../../../utils/functions/getToken';
import { SERVER_ENDPOINT } from '../../../../constants/constants';

interface IGenres {
  genres: string[];
}

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
    const accessToken = getToken('accessToken');
    const { data } = await axios.post<IGenres>(
      `${SERVER_ENDPOINT}/tracks/genres`,
      {
        accessToken: accessToken,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return data.genres;
  };

  const { isLoading, isError, data, error } = useQuery('genres', getGenres, {
    retry: 3,
  });

  if (isLoading) return <div>장르 로딩 중...</div>;

  return (
    <GenreSelectionTabStyle>
      {data && data.map((genre) => <Genre key={genre} genre={genre} />)}
    </GenreSelectionTabStyle>
  );
}

export default React.memo(GenreModalCheckBoxList);
