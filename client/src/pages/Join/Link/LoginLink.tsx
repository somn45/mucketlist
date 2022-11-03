import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LinkTab = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  span {
    color: white;
  }
`;

const AccountLink = styled(Link)`
  color: white;
  transition: color 0.25s ease-out;
  &:hover,
  &:focus {
    color: #7fffd4;
  }
`;

function LoginLink() {
  return (
    <LinkTab>
      <span>가입되어 있는 계정이 있으신가요?</span>
      <AccountLink to="/login">로그인</AccountLink>
    </LinkTab>
  );
}

export default React.memo(LoginLink);
