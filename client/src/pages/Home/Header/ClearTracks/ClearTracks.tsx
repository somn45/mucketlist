import styled from 'styled-components';
import { ButtonProps } from '../../../../utils/types/atomTypes';
import Icon from '../../../../components/Icon';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';

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

function ClearTracks({ onClick }: Omit<ButtonProps, 'ButtonStyle' | 'value'>) {
  return (
    <MenuItem>
      <button onClick={onClick}>
        <Icon icon={faRotateRight} />
      </button>
    </MenuItem>
  );
}

export default ClearTracks;
