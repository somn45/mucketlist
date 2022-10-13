import styled from 'styled-components';
import Button, { ButtonProps } from '../../../../components/atom/Button';

const AddCustomTrackButtonStyle = styled.button``;

function AddCustomTrackButton({ onClick }: Omit<ButtonProps, 'value'>) {
  return <Button value="트랙 찜하기" onClick={onClick} />;
}

export default AddCustomTrackButton;
