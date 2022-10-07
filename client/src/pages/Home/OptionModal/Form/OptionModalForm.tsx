import Form, { FormProps } from '../../../../components/atom/Form';
import { FormFrame } from '../../../../utils/styles/FormFrame';

function OptionModalForm({ children }: Omit<FormProps, 'FormStyle'>) {
  return <Form FormStyle={FormFrame}>{children}</Form>;
}

export default OptionModalForm;
