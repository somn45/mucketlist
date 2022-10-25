import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LinkTab = styled.div`
  display: flex;
  flex-direction: row;
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

function JoinLink() {
  return (
    <LinkTab>
      <span>계정이 없으신가요?</span>
      <AccountLink to="/join">회원가입</AccountLink>
    </LinkTab>
  );
}

export default JoinLink;
