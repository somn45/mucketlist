import styled from 'styled-components';
import Genre from '../../../../components/Genre';

interface GenreSelectionTabProps {
  genres: string[];
}

const GenreSelectionTabStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(5, 1fr);
  row-gap: 10px;
  margin-bottom: 30px;
  justify-content: space-between;
`;

function GenreSelectionTab({ genres }: GenreSelectionTabProps) {
  return (
    <GenreSelectionTabStyle>
      {genres.map((genre) => (
        <Genre key={genre} genre={genre} />
      ))}
    </GenreSelectionTabStyle>
  );
}

export default GenreSelectionTab;
