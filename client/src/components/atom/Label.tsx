import { StyledComponent } from 'styled-components';

interface LabelProps {
  LabelStyle?: StyledComponent<'label', any, {}, never>;
  value?: string | JSX.Element;
  htmlFor: string;
  id?: string;
}

function Label({ LabelStyle, value, htmlFor, id }: LabelProps) {
  return LabelStyle ? (
    <LabelStyle htmlFor={htmlFor}>{value}</LabelStyle>
  ) : (
    <label htmlFor={htmlFor}>{value}</label>
  );
}

export default Label;
