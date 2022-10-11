import styled from 'styled-components';
import Button, { ButtonProps } from '../../../../components/atom/Button';
import Icon from '../../../../components/atom/Icon';
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
      <Button
        ButtonStyle={undefined}
        value={<Icon icon={faRotateRight} />}
        onClick={onClick}
      />
    </MenuItem>
  );
}

export default ClearTracks;
