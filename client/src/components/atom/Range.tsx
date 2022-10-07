export interface RangeProps {
  min: string;
  max: string;
  step: string;
  currentRange: number;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

function Range({ currentRange, onChange, ...rangeUnit }: RangeProps) {
  return (
    <input
      type="range"
      {...rangeUnit}
      value={currentRange}
      onChange={onChange}
    />
  );
}

export default Range;
