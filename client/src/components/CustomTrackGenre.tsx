import styled from 'styled-components';

interface CustomTrackGenreProps {
  genre: string;
}

const TrackGenreItem = styled.span`
  padding: 3px 5px;
  margin-right: 5px;
  margin-bottom: 5px;
  background-color: #777777;
  border-radius: 5px;
  display: inline-block;
`;

function CustomTrackGenre({ genre }: CustomTrackGenreProps) {
  return <TrackGenreItem>{genre}</TrackGenreItem>;
}

export default CustomTrackGenre;
