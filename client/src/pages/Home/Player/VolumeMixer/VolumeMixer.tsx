import Button from '../../../../components/atom/Button';
import Icon from '../../../../components/atom/Icon';
import Range, { RangeProps } from '../../../../components/atom/Range';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';

interface VolumeMixerProps {
  currentRange: number;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

function VolumeMixer({ currentRange, onChange, onClick }: VolumeMixerProps) {
  return (
    <>
      <Range
        min="0"
        max="1"
        step="0.1"
        currentRange={currentRange}
        onChange={onChange}
      />
      <Button value={<Icon icon={faVolumeUp} />} onClick={onClick} />
    </>
  );
}

export default VolumeMixer;
