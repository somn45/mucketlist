import { AccountFormStyle as StyledSubmit } from '../../../../styles/account/accountStyle';
import { SubmitProps } from '../../../../types/atomTypes/atom';

function JoinSubmit({ value, onClick }: SubmitProps) {
  return (
    <>
      <StyledSubmit type="submit" value={value} onClick={onClick} />
    </>
  );
}

export default JoinSubmit;
