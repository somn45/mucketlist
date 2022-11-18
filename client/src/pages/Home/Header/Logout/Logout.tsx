import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { ButtonProps } from '../../../../utils/types/atomTypes';
import Icon from '../../../../components/Icon';
import HeaderMenuItem from '../../../../utils/styles/ItemStyle/HeaderMenuItem';
import HeaderMenuText from '../../../../utils/styles/ItemStyle/HeaderMenuText';
import { useMediaQuery } from 'react-responsive';

function Logout({ onClick }: Omit<ButtonProps, 'ButtonStyle' | 'value'>) {
  const isTablet = useMediaQuery({
    query: '(min-width: 768px)',
  });
  return (
    <HeaderMenuItem>
      <button onClick={onClick}>
        <Icon icon={faRightFromBracket} />
        {isTablet && <HeaderMenuText>로그아웃</HeaderMenuText>}
      </button>
    </HeaderMenuItem>
  );
}

export default Logout;
