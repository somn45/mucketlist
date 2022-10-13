import { faList } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import Icon from '../../../../components/atom/Icon';
import LinkElement from '../../../../components/atom/LinkElement';

const MenuItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  * {
    width: 20px;
    height: 20px;
  }
  & > * {
    box-sizing: content-box;
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
