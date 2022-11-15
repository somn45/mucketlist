import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import Icon from '../../../../components/Icon';
import { ButtonProps } from '../../../../utils/types/atomTypes';

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

function ActivateHandBook({
  onClick,
}: Omit<ButtonProps, 'ButtonStyle' | 'value'>) {
  return (
    <MenuItem>
      <button onClick={onClick}>
        <Icon icon={faQuestion} />
      </button>
    </MenuItem>
  );
}

export default ActivateHandBook;
