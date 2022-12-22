import { faArrowRight, faTurnDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
import { IMediaQuery, ContentLayout } from '../HandBookModal';

const HandBookContentWrap = styled.div<IMediaQuery>`
  width: 260px;
  position: absolute;
  right: ${(props) =>
    props.isMobile ? '80px' : props.isTablet ? '-65px' : '-130px'};
  bottom: ${(props) => (props.isMobile ? '70px' : '30px')};
`;

function HandBookAddCustomTrack() {
  const isMobile = useMediaQuery({
    query: '(max-width: 767px)',
  });
  const isTablet = useMediaQuery({
    query: '(max-width: 1023px)',
  });
  return (
    <ContentLayout>
      <HandBookContentWrap isMobile={isMobile} isTablet={isTablet}>
        <span>
          관심 있는 트랙을 나의 플레이리스트에 저장할 수 있는 버튼입니다. 같은
          곡은 한번만 저장할 수 있습니다.
        </span>
        <FontAwesomeIcon icon={isMobile ? faArrowRight : faTurnDown} />
      </HandBookContentWrap>
    </ContentLayout>
  );
}

export default HandBookAddCustomTrack;
