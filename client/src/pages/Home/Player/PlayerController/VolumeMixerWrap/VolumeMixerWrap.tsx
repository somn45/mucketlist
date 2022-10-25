import styled from 'styled-components';
import { DivProps } from '../../../../../utils/types/atomTypes';

interface VolumeMixerProps extends DivProps {
  onMouseEnter: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave: React.MouseEventHandler<HTMLDivElement>;
}

const VolumeMixerWrapStyle = styled.div`
  width: 130px;
  display: flex;
  justify-content: flex-start;
`;

function VolumeMixerWrap({
  children,
  onMouseEnter,
  onMouseLeave,
}: VolumeMixerProps) {
  return (
    <VolumeMixerWrapStyle
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </VolumeMixerWrapStyle>
  );
}

export default VolumeMixerWrap;
