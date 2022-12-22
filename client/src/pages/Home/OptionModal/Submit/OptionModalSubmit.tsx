import React from 'react';
import styled from 'styled-components';
import { SubmitProps } from '../../../../utils/types/atomTypes';

const Submit = styled.input`
  width: 250px;
  height: 50px;
  border: 0;
  border-radius: 5px;
  background-color: #20b2aa;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
`;

function OptionModalSubmit({ onClick }: SubmitProps) {
  return <Submit type="submit" value="음악 재생 순서 결정" onClick={onClick} />;
}

export default React.memo(OptionModalSubmit);
