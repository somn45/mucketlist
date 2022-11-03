import { FormFrame } from '../../../../utils/styles/FormFrame';
import { FormProps } from '../../../../utils/types/atomTypes';

function GenreModalForm({ children }: FormProps) {
  return <FormFrame>{children}</FormFrame>;
}

export default GenreModalForm;
