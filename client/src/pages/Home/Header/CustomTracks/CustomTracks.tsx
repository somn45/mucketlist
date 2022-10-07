import { faList } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import Icon from '../../../../components/atom/Icon';
import LinkElement from '../../../../components/atom/LinkElement';

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

function CustomTracks() {
  return (
    <MenuItem>
      <LinkElement
        LinkStyle={undefined}
        linkText={<Icon icon={faList} />}
        title="찜한 트랙 리스트"
        to="/tracks/custom"
      />
    </MenuItem>
  );
}

export default CustomTracks;
