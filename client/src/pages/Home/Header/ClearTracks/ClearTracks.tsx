import { ButtonProps } from '../../../../utils/types/atomTypes';
import Icon from '../../../../components/Icon';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { useMediaQuery } from 'react-responsive';
import HeaderMenuText from '../../../../utils/styles/ItemStyle/HeaderMenuText';
import HeaderMenuItem from '../../../../utils/styles/ItemStyle/HeaderMenuItem';

function ClearTracks({ onClick }: Omit<ButtonProps, 'ButtonStyle' | 'value'>) {
  const isTablet = useMediaQuery({
    query: '(min-width: 768px)',
  });
  return (
    <HeaderMenuItem>
      <button onClick={onClick}>
        <Icon icon={faRotateRight} />
        {isTablet && <HeaderMenuText>트랙 초기화</HeaderMenuText>}
      </button>
    </HeaderMenuItem>
  );
}

export default ClearTracks;
