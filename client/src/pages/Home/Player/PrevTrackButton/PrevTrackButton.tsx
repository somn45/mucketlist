import { faBackwardStep } from '@fortawesome/free-solid-svg-icons';
import Button, { ButtonProps } from '../../../../components/atom/Button';
import Icon from '../../../../components/atom/Icon';

function PrevTrackButton({ onClick }: Omit<ButtonProps, 'value'>) {
  return <Button value={<Icon icon={faBackwardStep} />} onClick={onClick} />;
}

export default PrevTrackButton;
