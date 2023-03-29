import React from 'react';

import { AccountFormStyle as StyledSubmit } from '../../../../styles/account/accountStyle';
import { SubmitProps } from '../../../../types/atomTypes/atom';

function LoginSubmit({ onClick }: Omit<SubmitProps, 'value' | 'SubmitStyle'>) {
  return (
    <>
      <StyledSubmit type="submit" value="로그인" onClick={onClick} />
    </>
  );
}

export default React.memo(LoginSubmit);
