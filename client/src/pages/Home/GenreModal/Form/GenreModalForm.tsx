import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
import ModalFormFrame from '../../../../utils/styles/ComponentStyle/Modal/ModalFormFrame';
import { FormProps } from '../../../../utils/types/atomTypes';
import { IMediaQuery } from '../../HandBookModal/HandBookModal';

const GenreModalFormFrame = styled(ModalFormFrame)<IMediaQuery>`
  width: ${(props) =>
    props.isMobile ? '100%' : props.isTablet ? '560px' : '780px'};
  height: ${(props) =>
    props.isMobile ? '100vh' : props.isTablet ? '600px' : '720px'};
`;

function GenreModalForm({ children }: FormProps) {
  const isMobile = useMediaQuery({
    query: '(max-width: 767px)',
  });
  const isTablet = useMediaQuery({
    query: '(max-width: 1023px)',
  });
  return (
    <GenreModalFormFrame isMobile={isMobile} isTablet={isTablet}>
      {children}
    </GenreModalFormFrame>
  );
}

export default GenreModalForm;
