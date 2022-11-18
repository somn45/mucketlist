import styled from 'styled-components';

const HeaderMenuItem = styled.div`
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

export default HeaderMenuItem;
