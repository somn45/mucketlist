import { faShuffle } from '@fortawesome/free-solid-svg-icons';
import Button, { ButtonProps } from '../../../../components/atom/Button';
import Icon from '../../../../components/atom/Icon';

function ShuffleMode({ onClick }: Omit<ButtonProps, 'value'>) {
  return <Button value={<Icon icon={faShuffle} />} onClick={onClick} />;
}

export default ShuffleMode;
