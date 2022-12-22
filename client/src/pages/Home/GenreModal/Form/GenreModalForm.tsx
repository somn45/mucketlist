import ModalFormFrame from '../../../../utils/styles/ComponentStyle/Modal/ModalFormFrame';
import { FormProps } from '../../../../utils/types/atomTypes';

function GenreModalForm({ children }: FormProps) {
  return <ModalFormFrame>{children}</ModalFormFrame>;
}

export default GenreModalForm;
