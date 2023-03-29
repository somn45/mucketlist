import styled from 'styled-components';

export const HeaderTab = styled.header`
  width: 100%;
  height: 80px;
  background-color: #20b2aa;
  position: fixed;
  left: 0;
  z-index: 1;
  nav,
  MenuList {
    height: 100%;
  }
`;

export const MenuList = styled.ul`
  padding: 20px 30px 0;
  display: flex;
  justify-content: space-between;
`;

export const HeaderMenuItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    &:hover {
      color: #0e3f43;
      text-decoration: underline;
    }
    & > svg {
      width: 20px;
      height: 20px;
      padding: 5px;
      box-sizing: content-box;
    }
  }
`;

export const HeaderMenuText = styled.span`
  width: auto;
  font-size: 20px;
  font-weight: 600;
`;
