import { StyledComponent } from 'styled-components';

export interface ButtonProps {
  ButtonStyle?: StyledComponent<'button', any, {}, never>;
  value: string | JSX.Element;
  title?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

function Button({ ButtonStyle, value, title, onClick }: ButtonProps) {
  return ButtonStyle ? (
    <ButtonStyle title={title} onClick={onClick}>
      {value}
    </ButtonStyle>
  ) : (
    <button onClick={onClick}>{value}</button>
  );
}

export default Button;
