import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const AccountSectionStyle = styled.section`
  width: 360px;
  margin-top: 250px;
`;

export const AccountForm = styled.form`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

export const AccountInputFrame = styled.input`
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

export const AccountFormStyle = styled(AccountInputFrame)`
  padding: 0;
  background-color: #20b2aa;
  border: 1px solid #20b2aa;
  font-size: 17px;
  font-weight: 600;
  &:hover {
    cursor: pointer;
    outline: none;
    border: 2px solid #adff2f;
  }
`;

export const AccountLinkWrap = styled.div`
  display: flex;
  flex-direction: row;
  span {
    color: white;
  }
`;

export const AccountLinkStyle = styled(Link)`
  color: white;
  transition: color 0.25s ease-out;
  &:hover,
  &:focus {
    color: #7fffd4;
  }
`;

export const AccountErrorMsg = styled.span`
  color: red;
  text-decoration: underline;
`;
