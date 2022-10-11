import { StyledComponent } from 'styled-components';

export interface DivProps {
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  DivStyle?: StyledComponent<'div', any, {}, never>;
  children?: JSX.Element | JSX.Element[];
}

function Div({ children, DivStyle, onMouseEnter, onMouseLeave }: DivProps) {
  return DivStyle ? (
    <DivStyle onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {children}
    </DivStyle>
  ) : (
    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {children}
    </div>
  );
}

export default Div;
