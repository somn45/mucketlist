import { AccountForm } from '../../../../styles/account/accountStyle';
import { FormProps } from '../../../../types/atomTypes/atom';

function JoinForm({ children }: FormProps) {
  return <AccountForm>{children}</AccountForm>;
}

export default JoinForm;
