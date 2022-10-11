import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import Button from '../../../../components/atom/Button';
import Icon from '../../../../components/atom/Icon';

interface VolumeButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

function VolumeButton({ onClick }: VolumeButtonProps) {
  return <Button value={<Icon icon={faVolumeUp} />} onClick={onClick} />;
}

export default VolumeButton;
