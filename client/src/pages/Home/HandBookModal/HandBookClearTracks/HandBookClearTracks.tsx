import styled from 'styled-components';
import HandBookFrame from '../../../../utils/styles/ComponentStyle/Modal/HandBookFrame';

const HandBookClearTracksWrap = styled(HandBookFrame)`
  top: 80px;
  align-self: center;
`;

function HandBookClearTracks() {
  return (
    <HandBookClearTracksWrap>
      <span>
        사용자의 관심 장르가 달라졌거나 등록된 트랙 리스트를 교체하고 싶은 경우
        이 버튼을 누르면 새로운 트랙 리스트로 교체됩니다.
      </span>
    </HandBookClearTracksWrap>
  );
}

export default HandBookClearTracks;
