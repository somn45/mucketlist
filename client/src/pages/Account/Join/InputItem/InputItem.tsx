import React from 'react';
import styled from 'styled-components';

import { AccountInputFrame as StyledInputItem } from '../../../../styles/account/accountStyle';
import { JoinLabel } from '../../../../styles/account/joinStyle';
import { InputProps } from '../../../../types/atomTypes/atom';

const Label = styled(JoinLabel)``;

function InputItem({
  htmlFor,
  type,
  value,
  setState,
  labelText,
  placeholder,
}: InputProps) {
  return (
    <>
      <Label htmlFor={htmlFor}>{labelText}</Label>
      <StyledInputItem
        type={type}
        value={value}
        onChange={(e) => setState(e.target.value)}
        placeholder={placeholder}
      />
    </>
  );
}

export default React.memo(InputItem);
