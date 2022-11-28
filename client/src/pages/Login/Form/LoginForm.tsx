import styled from 'styled-components';
import { FormProps } from '../../../utils/types/atomTypes';
import AccountForm from '../../../utils/styles/ComponentStyle/AccoutForm/AccountForm';

function LoginForm({ children }: FormProps) {
  return <AccountForm>{children}</AccountForm>;
}

export default LoginForm;
