import { AccountSectionStyle as StyledLoginSection } from '../../../../styles/account/accountStyle';

interface IChildren {
  children: React.ReactNode;
}

function LoginSection({ children }: IChildren) {
  return <StyledLoginSection>{children}</StyledLoginSection>;
}

export default LoginSection;
