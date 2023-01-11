import React from 'react';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
import Genre from '../../../../components/Genre';
import { IMediaQuery } from '../../HandBookModal/HandBookModal';

interface GenreSelectionTabProps {
  genres: string[];
}

const GenreSelectionTabStyle = styled.div<IMediaQuery>`
  display: grid;
  grid-template-columns: ${(props) =>
    props.isMobile
      ? 'repeat(2, 1fr)'
      : props.isTablet
      ? 'repeat(3, 1fr)'
      : 'repeat(4, 1fr)'};
  grid-template-rows: repeat(5, 1fr);
  row-gap: 10px;
  margin-bottom: 30px;
  justify-content: space-between;
`;

function GenreSelectionTab({ genres }: GenreSelectionTabProps) {
  const isMobile = useMediaQuery({
    query: '(max-width: 767px)',
  });
  const isTablet = useMediaQuery({
    query: '(max-width: 1023px)',
  });
  return (
    <GenreSelectionTabStyle isMobile={isMobile} isTablet={isTablet}>
      {genres.map((genre) => (
        <Genre key={genre} genre={genre} />
      ))}
    </GenreSelectionTabStyle>
  );
}

export default React.memo(GenreSelectionTab);
