import { StyledComponent } from 'styled-components';

export interface ButtonProps {
  ButtonStyle?: StyledComponent<'button', any, {}, never>;
  value: string | JSX.Element;
  title?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  onMouseEnter?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLButtonElement>;
}

function Button({
  ButtonStyle,
  value,
  title,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: ButtonProps) {
  return ButtonStyle ? (
    <ButtonStyle
      title={title}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {value}
    </ButtonStyle>
  ) : (
    <button
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {value}
    </button>
  );
}

export default Button;
