import { StyledComponent } from 'styled-components';

export interface RangeProps {
  RangeStyle?: StyledComponent<'input', any, {}, never>;
  min: string;
  max: string;
  step: string;
  currentRange: number;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

function Range({
  RangeStyle,
  currentRange,
  onChange,
  ...rangeUnit
}: RangeProps) {
  return RangeStyle ? (
    <RangeStyle
      type="range"
      {...rangeUnit}
      value={currentRange}
      onChange={onChange}
    />
  ) : (
    <input
      type="range"
      {...rangeUnit}
      value={currentRange}
      onChange={onChange}
    />
  );
}

export default Range;
