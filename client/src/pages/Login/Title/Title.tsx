import styled from 'styled-components';
import { SpanProps } from '../../../components/atom/Span';
import Span from '../../../components/atom/Span';

const TitleStyle = styled.h1`
  @font-face {
    font-family: 'Rubic';
    src: url('./static/fonts/RubikMarkerHatch.ttf') format('truetype');
  }
  margin-bottom: 30px;
  font-family: 'Rubic' sans-serif;
  font-size: 46px;
  font-weight: 600;
  color: white;
`;

function Title() {
  return <Span TextStyle={TitleStyle} text="Mucketlist"></Span>;
}

export default Title;
