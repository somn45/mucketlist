import { faTurnUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import HandBookFrame from '../../../../utils/styles/ComponentStyle/Modal/HandBookFrame';

const HandBookLogOutWrap = styled(HandBookFrame)`
  width: 260px;
  position: absolute;
  right: 40px;
  top: 80px;
`;

function HandBookLogOut() {
  return (
    <HandBookLogOutWrap>
      <span>
        이 버튼을 누를 시 원래 계정이 로그아웃되고 새로운 계정으로 로그인이
        가능합니다. 등록되었던 기존 트랙은 그대로 유지됩니다.
      </span>
      <FontAwesomeIcon icon={faTurnUp} />
    </HandBookLogOutWrap>
  );
}
export default HandBookLogOut;
