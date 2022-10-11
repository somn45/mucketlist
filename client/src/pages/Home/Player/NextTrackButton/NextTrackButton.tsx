import { faForwardStep } from '@fortawesome/free-solid-svg-icons';
import Button, { ButtonProps } from '../../../../components/atom/Button';
import Icon from '../../../../components/atom/Icon';

function NextTrackButton({ onClick }: Omit<ButtonProps, 'value'>) {
  return <Button value={<Icon icon={faForwardStep} />} onClick={onClick} />;
}

export default NextTrackButton;
