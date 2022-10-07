import { StyledComponent } from 'styled-components';

export interface SpanProps {
  TextStyle?: StyledComponent<'span', any, {}, never>;
  text: string;
}

function Span({ TextStyle, text }: SpanProps) {
  return TextStyle ? <TextStyle>{text}</TextStyle> : <span>{text}</span>;
}

export default Span;
