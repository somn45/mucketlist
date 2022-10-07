import { Link, LinkProps } from 'react-router-dom';
import { StyledComponent } from 'styled-components';

export interface LinkElementProps {
  to: string;
  linkText: string | JSX.Element;
  title?: string;
  LinkStyle?: StyledComponent<
    React.ForwardRefExoticComponent<
      LinkProps & React.RefAttributes<HTMLAnchorElement>
    >,
    any,
    {},
    never
  >;
}

function LinkElement({ to, title, linkText, LinkStyle }: LinkElementProps) {
  return LinkStyle ? (
    <LinkStyle to={to} title={title ? title : ''}>
      {linkText}
    </LinkStyle>
  ) : (
    <Link to={to}>{linkText}</Link>
  );
}

export default LinkElement;
