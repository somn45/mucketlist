import React from 'react';
import styled from 'styled-components';

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
  return <TitleStyle>MucketList</TitleStyle>;
}

export default React.memo(Title);
