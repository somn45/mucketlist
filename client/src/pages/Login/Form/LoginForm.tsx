import styled from 'styled-components';
import { FormProps } from '../../../utils/types/atomTypes';

const AccountForm = styled.form`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

function LoginForm({ children }: FormProps) {
  return <AccountForm>{children}</AccountForm>;
}

export default LoginForm;
