import styled from 'styled-components';

export const LoginTitle = styled.h1`
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

export const InputTab = styled.div`
  position: relative;
  svg {
    width: 20px;
    height: 20px;
    position: absolute;
    left: 10px;
    top: 10px;
  }
`;
