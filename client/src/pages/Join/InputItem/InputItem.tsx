import React from 'react';
import styled from 'styled-components';
import AccountInputFrame from '../../../utils/styles/ComponentStyle/AccoutForm/AccountInputFrame';
import { InputProps } from '../../../utils/types/atomTypes';

const Label = styled.label`
  height: 20px;
  margin: 10px 0;
  color: white;
  font-weight: 600;
  &:first-child {
    margin-top: 0;
  }
`;

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
      <AccountInputFrame
        type={type}
        value={value}
        onChange={(e) => setState(e.target.value)}
        placeholder={placeholder}
      />
    </>
  );
}

export default React.memo(InputItem);
