import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
import ModalFormFrame from '../../../../utils/styles/ComponentStyle/Modal/ModalFormFrame';
import { FormProps } from '../../../../utils/types/atomTypes';
import { IMediaQuery } from '../../HandBookModal/HandBookModal';

const OptionModalFormFrame = styled(ModalFormFrame)<IMediaQuery>`
  width: ${(props) => (props.isMobile ? '100%' : '420px')};
  height: ${(props) => (props.isMobile ? '100vh' : '560px')};
`;

function OptionModalForm({ children }: FormProps) {
  const isMobile = useMediaQuery({
    query: '(max-width: 419px)',
  });
  return (
    <OptionModalFormFrame isMobile={isMobile}>{children}</OptionModalFormFrame>
  );
}

export default OptionModalForm;
