import styled from 'styled-components';

export const Main = styled.main`
  margin-top: 80px;
  display: flex;
  justify-content: center;
`;

const HomeSection = styled.section`
  padding-top: 40px;
  display: grid;
  gap: 6px;
  position: relative;
`;

export const HomeMobileSection = styled(HomeSection)`
  grid-template-columns: repeat(5, 48px);
  grid-template-rows: repeat(8, 48px);
`;

export const HomeTabletSection = styled(HomeSection)`
  grid-template-columns: repeat(7, 64px);
  grid-template-rows: repeat(9, 64px);
`;

export const HomeDesktopSection = styled(HomeSection)`
  grid-template-columns: repeat(10, 64px);
  grid-template-rows: repeat(10, 64px);
`;
