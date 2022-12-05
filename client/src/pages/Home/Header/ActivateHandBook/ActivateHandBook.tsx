import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { useMediaQuery } from 'react-responsive';
import Icon from '../../../../components/Icon';
import HeaderMenuItem from '../../../../utils/styles/ItemStyle/HeaderMenuItem';
import HeaderMenuText from '../../../../utils/styles/ItemStyle/HeaderMenuText';
import { ButtonProps } from '../../../../utils/types/atomTypes';

function ActivateHandBook({
  onClick,
}: Omit<ButtonProps, 'ButtonStyle' | 'value'>) {
  const isTablet = useMediaQuery({
    query: '(min-width: 768px)',
  });
  return (
    <HeaderMenuItem>
      <button onClick={onClick}>
        <Icon icon={faQuestion} />
        {isTablet && <HeaderMenuText>도움말</HeaderMenuText>}
      </button>
    </HeaderMenuItem>
  );
}

export default ActivateHandBook;
