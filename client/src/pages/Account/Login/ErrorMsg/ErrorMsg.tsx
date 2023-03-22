import React from 'react';

import { AccountErrorMsg as StyledErrorMsg } from '../../../../styles/account/accountStyle';
import { SpanProps } from '../../../../types/atomTypes/atom';

function ErrorMsg({ text }: SpanProps) {
  return <StyledErrorMsg>{text}</StyledErrorMsg>;
}

export default React.memo(ErrorMsg);
