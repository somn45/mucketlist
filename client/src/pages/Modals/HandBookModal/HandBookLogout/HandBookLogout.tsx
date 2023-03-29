import { faTurnUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

const HandBookLogoutWrap = styled.div`
  width: 260px;
  position: absolute;
  right: 40px;
  top: 80px;
`;

function HandBookLogout() {
  return (
    <HandBookLogoutWrap>
      <span>
        이 버튼을 누를 시 원래 계정이 로그아웃되고 새로운 계정으로 로그인이
        가능합니다. 등록되었던 기존 트랙은 그대로 유지됩니다.
      </span>
      <FontAwesomeIcon icon={faTurnUp} />
    </HandBookLogoutWrap>
  );
}
export default HandBookLogout;
