import styled from 'styled-components';
import Div, { DivProps } from '../../../../components/atom/Div';

interface VolumeMixerWrap extends DivProps {
  children?: JSX.Element[] | JSX.Element;
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
}: VolumeMixerWrap) {
  return (
    <Div
      DivStyle={VolumeMixerWrapStyle}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </Div>
  );
}

export default VolumeMixerWrap;
