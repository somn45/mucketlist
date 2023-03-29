import styled from 'styled-components';

const HandBookBodyWrap = styled.div`
  width: 90%;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  div {
    margin-bottom: 20px;
  }
  span {
  }
`;
const Notice = styled.div`
  color: #3f9;
`;
const Intro = styled.div``;
const MainContent = styled.div``;
const Ending = styled.div``;

function HandBookBody() {
  return (
    <HandBookBodyWrap>
      <Notice>
        <span>
          - MucketList는 저작권법을 위배하지 않기 위해 Spotify 프리미엄 유저만
          트랙을 들을 수 있음을 알려드립니다. -
        </span>
      </Notice>
      <Intro>
        <span>MucketList를 처음 이용하시는 분을 위한 안내서입니다.</span>
      </Intro>
      <MainContent>
        <span>
          MucketList는 사용자가 좋아하는 트랙을 토대로 하여 관심있어 할 만한
          트랙을 계속해서 들을 수 있도록 합니다. Spotify Api를 이용하여 국내의
          트랙 뿐만이 아니라 전셰계의 트랙을 감상하실 수 있습니다.
        </span>
      </MainContent>
      <Ending>
        <span>빈 공간을 클릭하시면 다음 안내로 넘어갈 수 있습니다.</span>
      </Ending>
    </HandBookBodyWrap>
  );
}

export default HandBookBody;
