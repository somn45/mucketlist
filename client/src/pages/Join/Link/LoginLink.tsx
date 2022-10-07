import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LinkElement, {
  LinkElementProps,
} from '../../../components/atom/LinkElement';

interface LoginLinkProps extends LinkElementProps {
  text: string;
}

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

function LoginLink({
  text,
  linkText,
}: Omit<LoginLinkProps, 'LinkStyle' | 'to'>) {
  return (
    <LinkTab>
      <span>{text}</span>
      <LinkElement LinkStyle={AccountLink} to="/login" linkText={linkText} />
    </LinkTab>
  );
}

export default LoginLink;
