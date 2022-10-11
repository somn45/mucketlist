import Button from '../../../../components/atom/Button';
import Icon from '../../../../components/atom/Icon';
import Range, { RangeProps } from '../../../../components/atom/Range';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

interface VolumeMixerProps {
  currentRange: number;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const VolumeMixerWrap = styled.div`
  margin-left: 5px;
`;

const RangeStyle = styled.input`
  width: 100px;
`;

function VolumeMixer({ currentRange, onChange }: VolumeMixerProps) {
  return (
    <VolumeMixerWrap>
      <Range
        RangeStyle={RangeStyle}
        min="0"
        max="1"
        step="0.1"
        currentRange={currentRange}
        onChange={onChange}
      />
    </VolumeMixerWrap>
  );
}

export default VolumeMixer;
