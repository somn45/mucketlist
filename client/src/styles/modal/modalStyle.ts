import styled, { css } from 'styled-components';
import { FadeIn, FadeOut } from '../animation/FadeKeyframes';

export const Modal = styled.div`
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 2;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AnimatedModal = styled(Modal)<{ isActive: boolean }>`
  animation: ${(props) =>
    props.isActive
      ? css`
          ${FadeIn} 0.6s linear forwards
        `
      : css`
          ${FadeOut} 0.6s linear forwards
        `};
`;

export const ModalTitle = styled.span`
  margin-bottom: 20px;
  font-size: 24px;
  text-align: center;
`;

export const ModalForm = styled.form`
  width: 425px;
  height: 600px;
  padding: 0 20px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h2 {
    margin-bottom: 20px;
    font-size: 24px;
    text-align: center;
  }
`;

export const CheckBoxWrap = styled.div`
  padding-left: 20px;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  flex-direction: row;
  input[type='checkbox'] {
    display: none;
  }
  input[type='checkbox'] + label {
    width: 18px;
    height: 18px;
    margin-right: 5px;
    border: 2px solid black;
    cursor: pointer;
    svg {
      display: none;
    }
  }
  input[type='checkbox']:checked + label {
    background-color: #7fffd4;
    svg {
      display: block;
    }
  }
`;

export const HandBookWrap = styled(Modal)`
  width: 100%;
  color: white;
  display: flex;
  flex-direction: column;
  span {
    font-size: 13px;
  }
`;
