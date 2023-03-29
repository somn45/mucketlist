import { AccountSectionStyle as StyledJoinSection } from '../../../../styles/account/accountStyle';

interface IChildren {
  children: React.ReactNode;
}

function JoinSection({ children }: IChildren) {
  return <StyledJoinSection>{children}</StyledJoinSection>;
}

export default JoinSection;
