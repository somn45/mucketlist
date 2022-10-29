import styled from 'styled-components';

interface PlayerTrackImageProps {
  name: string;
  image: string;
}

const PlayerTrackImageStyle = styled.img`
  margin-left: 15px;
  margin-right: 5px;
`;

function PlayerTrackImage({ name, image }: PlayerTrackImageProps) {
  return <PlayerTrackImageStyle src={image} alt={name} />;
}

export default PlayerTrackImage;
