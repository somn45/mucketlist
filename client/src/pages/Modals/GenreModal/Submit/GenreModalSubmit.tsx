import styled from 'styled-components';

import { SubmitProps } from '../../../../types/atomTypes/atom';

const Submit = styled.input`
  width: 250px;
  height: 50px;
  border: 0;
  border-radius: 5px;
  background-color: #20b2aa;
  font-size: 16px;
  font-weight: 600;
  transition: background-color 0.35s ease-out;
  cursor: pointer;
  &:hover,
  &:focus {
    background-color: #33a54a;
  }
`;

function GenreModalSubmit({ onClick }: SubmitProps) {
  return <Submit type="submit" value="트랙 검색하기" onClick={onClick} />;
}

export default GenreModalSubmit;
