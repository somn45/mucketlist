import { faList } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Icon from '../../../../components/Icon';
import HeaderMenuText from '../../../../utils/styles/ItemStyle/HeaderMenuText';
import HeaderMenuItem from '../../../../utils/styles/ItemStyle/HeaderMenuItem';

function CustomTracks() {
  const navigate = useNavigate();
  const isTablet = useMediaQuery({
    query: '(min-width: 768px)',
  });

  const moveCustomTrackListModal = () => {
    navigate('/tracks/custom');
  };
  return (
    <HeaderMenuItem>
      <button onClick={moveCustomTrackListModal}>
        <Icon icon={faList} />
        {isTablet && <HeaderMenuText>찜한 트랙 목록</HeaderMenuText>}
      </button>
    </HeaderMenuItem>
  );
}

export default CustomTracks;
