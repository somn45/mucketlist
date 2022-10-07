import styled from 'styled-components';
import Submit, { SubmitProps } from '../../../components/atom/Submit';
import { InputStyle } from '../InputItem/InputItem';

type JoinSubmitProps = Omit<SubmitProps, 'SubmitStyle'>;

const SubmitStyle = styled(InputStyle)`
  padding: 0;
  background-color: #20b2aa;
  border: 1px solid #20b2aa;
  font-size: 17px;
  font-weight: 600;
  &:hover {
    cursor: pointer;
    outline: none;
    border: 2px solid #adff2f;
  }
`;

function JoinSubmit({ value, onClick }: JoinSubmitProps) {
  return (
    <>
      <Submit SubmitStyle={SubmitStyle} value={value} onClick={onClick} />
    </>
  );
}

export default JoinSubmit;
