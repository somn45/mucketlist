import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import Button from '../../../../components/atom/Button';
import { ButtonProps } from '../../../../components/atom/Button';
import Icon from '../../../../components/atom/Icon';

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
      <Button
        ButtonStyle={undefined}
        value={<Icon icon={faRightFromBracket} />}
        title="로그아웃"
        onClick={onClick}
      />
    </MenuItem>
  );
}

export default Logout;
