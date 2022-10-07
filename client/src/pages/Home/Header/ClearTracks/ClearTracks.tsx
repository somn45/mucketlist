import styled from 'styled-components';
import Button, { ButtonProps } from '../../../../components/atom/Button';

const MenuItem = styled.li`
  * {
    width: 25px;
    height: 25px;
  }
  Link,
  LogoutButton {
    padding: 5px;
  }
`;

function ClearTracks({ onClick }: Omit<ButtonProps, 'ButtonStyle' | 'value'>) {
  return (
    <MenuItem>
      <Button ButtonStyle={undefined} value="트랙 초기화" onClick={onClick} />
    </MenuItem>
  );
}

export default ClearTracks;
