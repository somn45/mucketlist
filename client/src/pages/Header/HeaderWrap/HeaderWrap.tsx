import { HeaderTab } from '../../../styles/header/headerStyle';
import { IChildren } from '../../../types/moduleTypes/moduleTypes';

function HeaderWrap({ children }: IChildren) {
  return <HeaderTab>{children}</HeaderTab>;
}

export default HeaderWrap;
