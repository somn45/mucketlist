import styled from 'styled-components';
import Form, { FormProps } from '../../../components/atom/Form';

const AccountForm = styled.form`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

function JoinForm({ children }: Omit<FormProps, 'FormStyle'>) {
  return <Form FormStyle={AccountForm}>{children}</Form>;
}

export default JoinForm;
