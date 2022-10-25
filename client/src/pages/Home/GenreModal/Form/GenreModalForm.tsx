import { FormFrame } from '../../../../utils/styles/FormFrame';
import { FormProps } from '../../../../utils/types/atomTypes';

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

function GenreModalForm({ children }: FormProps) {
  return <FormFrame>{children}</FormFrame>;
}

export default GenreModalForm;
