import styled from 'styled-components';
import Submit, { SubmitProps } from '../../../../components/atom/Submit';

const SubmitStyle = styled.input`
  width: 250px;
  height: 50px;
  border: 0;
  border-radius: 5px;
  background-color: #20b2aa;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
`;

function OptionModalSubmit({
  onClick,
}: Omit<SubmitProps, 'value' | 'SubmitStyle'>) {
  return (
    <Submit
      SubmitStyle={SubmitStyle}
      value="음악 재생 순서 결정"
      onClick={onClick}
    />
  );
}

export default OptionModalSubmit;
