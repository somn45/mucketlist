import { faList } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Icon from '../../../../components/Icon';

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
      <Link to="/tracks/custom">
        <Icon icon={faList} />
      </Link>
    </MenuItem>
  );
}

export default CustomTracks;
