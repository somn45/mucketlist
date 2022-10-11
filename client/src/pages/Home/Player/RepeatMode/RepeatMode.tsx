import { faRepeat } from '@fortawesome/free-solid-svg-icons';
import Button, { ButtonProps } from '../../../../components/atom/Button';
import Icon from '../../../../components/atom/Icon';

function RepeatMode({ onClick }: Omit<ButtonProps, 'value'>) {
  return <Button value={<Icon icon={faRepeat} />} onClick={onClick} />;
}

export default RepeatMode;
