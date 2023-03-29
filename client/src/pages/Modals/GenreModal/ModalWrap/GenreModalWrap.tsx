import { AnimatedModal } from '../../../../styles/modal/modalStyle';
import { ModalWrapProps } from '../../../../types/moduleTypes/moduleTypes';

function GenreModalWrap({ children, isActive }: ModalWrapProps) {
  return <AnimatedModal isActive={isActive}>{children}</AnimatedModal>;
}

export default GenreModalWrap;
