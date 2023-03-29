import React from 'react';

import {
  AccountLinkStyle as StyledLink,
  AccountLinkWrap as LinkWrap,
} from '../../../../styles/account/accountStyle';

function LoginLink() {
  return (
    <LinkWrap>
      <span>가입되어 있는 계정이 있으신가요?</span>
      <StyledLink to="/login">로그인</StyledLink>
    </LinkWrap>
  );
}

export default React.memo(LoginLink);
