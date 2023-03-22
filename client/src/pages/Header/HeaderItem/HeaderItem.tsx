import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import Icon from '../../../components/Icon';
import {
  HeaderMenuItem,
  HeaderMenuText,
} from '../../../styles/header/headerStyle';
import { ButtonProps } from '../../../types/atomTypes/atom';

interface HeaderItemProps extends ButtonProps {
  text: string;
  icon: IconDefinition;
  isMobile: boolean;
}

function HeaderItem({
  onClick,
  text,
  icon,
  isMobile,
}: Omit<HeaderItemProps, 'value'>) {
  return (
    <div>
      <HeaderMenuItem>
        <Icon icon={icon} />
        <button onClick={onClick}>
          {!isMobile && <HeaderMenuText>{text}</HeaderMenuText>}
        </button>
      </HeaderMenuItem>
    </div>
  );
}

export default HeaderItem;
