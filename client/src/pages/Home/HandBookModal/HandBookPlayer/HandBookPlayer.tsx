import { faTurnDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
import { IMediaQuery } from '../HandBookModal';

const HandBookPlayerWrap = styled.div<IMediaQuery>`
  width: 260px;
  position: absolute;
  align-self: center;
  bottom: ${(props) => (props.isMobile ? '120px' : '30px')};
  span {
    color: white;
  }
`;

function HandBookPlayer() {
  const isMobile = useMediaQuery({
    query: '(max-width: 767px)',
  });
  return (
    <HandBookPlayerWrap isMobile={isMobile}>
      <span>
        트랙을 재생하는 플레이어입니다. 기본적인 기능인 트랙 재생, 일시 정지
        기능, 볼륨 조절 외에도 반복 재생, 랜덤 재생, 이전 & 다음 곡으로 스킵하기
        기능이 존재합니다.
      </span>
      <FontAwesomeIcon icon={faTurnDown} />
    </HandBookPlayerWrap>
  );
}

export default HandBookPlayer;
