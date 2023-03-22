import { ModalForm as StyledModalForm } from '../../../../styles/modal/modalStyle';
import { FormProps } from '../../../../types/atomTypes/atom';

function OptionModalForm({ children }: FormProps) {
  return <StyledModalForm>{children}</StyledModalForm>;
}

export default OptionModalForm;
