import { AnimatedModal } from '../../../../styles/modal/modalStyle';
import { ModalWrapProps } from '../../../../types/moduleTypes/moduleTypes';

function OptionModalWrap({ children, isActive }: ModalWrapProps) {
  return <AnimatedModal isActive={isActive}>{children}</AnimatedModal>;
}

export default OptionModalWrap;
