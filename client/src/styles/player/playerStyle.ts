import styled from 'styled-components';
import { IPlayMode } from '../../types/playerTypes/playerTypes';

export const playerWrap = styled.div<{ isPlay: boolean }>`
  width: 375px;
  height: 108px;
  background-color: white;
  border: ${(props) => (props.isPlay ? '5px solid green' : '5px solid red')};
  border-radius: 36px;
  position: fixed;
  bottom: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const PlayerColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DefaultImage = styled.div`
  width: 64px;
  height: 64px;
  margin-left: 15px;
  margin-right: 5px;
`;

export const PlayerTrackImage = styled.img`
  width: 64px;
  height: 64px;
  margin-left: 15px;
  margin-right: 5px;
`;

export const TrackName = styled.span`
  font-size: 14px;
  font-weight: 600;
`;

export const ArtistName = styled.span`
  font-size: 13px;
  color: #222222;
`;

export const PlayerControllerWrap = styled.div`
  width: 180px;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  & > button {
    width: 20px;
    height: 20px;
  }
`;

export const PlayModeButton = styled.button<IPlayMode>`
  opacity: ${(props) => (props.isRepeat || props.isShuffle ? 1 : 0.4)};
`;

export const VolumeMixerWrap = styled.div`
  width: 130px;
  display: flex;
  justify-content: flex-start;
`;

export const VolumeMixerContainer = styled.div`
  margin-left: 5px;
`;

export const VolumeRange = styled.input`
  width: 130px;
`;
