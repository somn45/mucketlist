import React from 'react';

import {
  AccountLinkStyle as StyledLink,
  AccountLinkWrap as LinkWrap,
} from '../../../../styles/account/accountStyle';

function JoinLink() {
  return (
    <LinkWrap>
      <span>계정이 없으신가요?</span>
      <StyledLink to="/join">회원가입</StyledLink>
    </LinkWrap>
  );
}

export default React.memo(JoinLink);
