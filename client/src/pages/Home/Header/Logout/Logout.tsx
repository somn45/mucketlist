import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { ButtonProps } from '../../../../utils/types/atomTypes';
import Icon from '../../../../components/Icon';

const MenuItem = styled.li`
  * {
    width: 20px;
    height: 20px;
  }
  & > * {
    box-sizing: content-box;
    padding: 5px;
  }
`;

function Logout({ onClick }: Omit<ButtonProps, 'ButtonStyle' | 'value'>) {
  return (
    <MenuItem>
      <button onClick={onClick}>
        <Icon icon={faRightFromBracket} />
      </button>
    </MenuItem>
  );
}

export default Logout;
