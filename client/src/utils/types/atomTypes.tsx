import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface DivProps {
  children?: JSX.Element | JSX.Element[];
}

export interface SpanProps {
  text: string;
}

export interface LinkElementProps {
  to: string;
  linkText: string | JSX.Element;
}

export interface ButtonProps {
  value?: string | JSX.Element;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

export interface FormProps {
  children?: JSX.Element | JSX.Element[] | null;
}

export interface InputProps {
  htmlFor?: string;
  type: string;
  value: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  labelText?: string;
  placeholder: string;
}

export interface SubmitProps {
  value?: string;
  onClick: React.MouseEventHandler<HTMLInputElement> | undefined;
}

export interface IconProps {
  icon: IconDefinition;
}
