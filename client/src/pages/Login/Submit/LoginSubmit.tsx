import styled from 'styled-components';
import { SubmitProps } from '../../../utils/types/atomTypes';
import { InputStyle } from '../../Join/InputItem/InputItem';

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

function LoginSubmit({ onClick }: Omit<SubmitProps, 'value' | 'SubmitStyle'>) {
  return (
    <>
      <SubmitStyle type="submit" value="로그인" onClick={onClick} />
    </>
  );
}

export default LoginSubmit;
