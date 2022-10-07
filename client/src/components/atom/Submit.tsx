import { StyledComponent } from 'styled-components';

export interface SubmitProps {
  SubmitStyle: StyledComponent<'input', any, {}, never>;
  value: string;
  onClick: React.MouseEventHandler<HTMLInputElement> | undefined;
}

function Submit({ SubmitStyle, value, onClick }: SubmitProps) {
  return <SubmitStyle type="submit" value={value} onClick={onClick} />;
}

export default Submit;
