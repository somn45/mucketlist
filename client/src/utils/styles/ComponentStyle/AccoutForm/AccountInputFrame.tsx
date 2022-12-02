import styled from 'styled-components';

const AccountInputFrame = styled.input`
  width: 100%;
  height: 40px;
  padding-left: 40px;
  margin-bottom: 2px;
  background-color: #7fffd4;
  border: 1px solid #7fffd4;
  border-radius: 5px;
  font-size: 15px;
  &:focus,
  &:active {
    outline: none;
    border: 2px solid #adff2f;
  }
  &::placeholder {
    font-size: 15px;
    font-weight: 600;
  }
`;

export default AccountInputFrame;
