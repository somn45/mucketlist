import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LinkElement, {
  LinkElementProps,
} from '../../../components/atom/LinkElement';
import Span from '../../../components/atom/Span';

interface JoinLinkProps extends LinkElementProps {
  text: string;
}

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
      <Span text="계정이 없으신가요?" />
      <LinkElement to="/join" linkText="회원가입" LinkStyle={AccountLink} />
    </LinkTab>
  );
}

export default JoinLink;
