import { ModalForm } from '../../../../styles/modal/modalStyle';
import { FormProps } from '../../../../types/atomTypes/atom';

function GenreModalForm({ children }: FormProps) {
  return <ModalForm>{children}</ModalForm>;
}

export default GenreModalForm;
