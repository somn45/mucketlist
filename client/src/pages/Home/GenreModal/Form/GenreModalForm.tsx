import Form, { FormProps } from '../../../../components/atom/Form';
import { FormFrame } from '../../../../utils/styles/FormFrame';

/*
const OpenGenreModal = keyframes`
  from {
    opacity: 0;
  } to {
    opacity: 0.8;
  }
`;

const GenreModalFormStyle = styled(FormFrame)<GenreModalFormProps>`
  animation: ${(props) =>
    props.styledProps.isActive === false
      ? css`
          ${OpenGenreModal} 0.4s ease-out
        `
      : css`
          ${OpenGenreModal} 0.4s ease-out
        `};
`;
*/

function GenreModalForm({ children }: Omit<FormProps, 'FormStyle'>) {
  return <Form FormStyle={FormFrame}>{children}</Form>;
}

export default GenreModalForm;
