import styled from 'styled-components';
import { Modal } from '../modal/modalStyle';

export const CustomTrackListWrap = styled(Modal)`
  padding: 30px 10px 0;
  color: white;
  overflow: auto;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const CustomTrackHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.span`
  font-size: 20px;
  font-weight: 600;
`;

const CustomTrackList = styled.ul`
  width: 100%;
  margin-top: 10px;
`;

export const MobileCustomTrackList = styled(CustomTrackList)`
  display: flex;
  flex-direction: column;
`;

export const NormalCustomTrackList = styled(CustomTrackList)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(auto-fill, 1fr);
  gap: 10px;
`;

export const WideScreenCustomTrackList = styled(CustomTrackList)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(auto-fill, minmax(1fr, 1fr));
  gap: 10px;
`;

export const CloseButton = styled.button`
  box-sizing: content-box;
  width: 20px;
  height: 20px;
  padding: 3px;
  font-size: 20px;
  color: white;
`;

export const TrackItem = styled.li`
  font-size: 14px;
  color: #ddeedd;
  margin-bottom: 14px;
  display: flex;
  flex-direction: column;
`;

export const TrackColumn = styled.div`
  margin-bottom: 4px;
  display: flex;
  flex-direction: row;
`;

export const TrackInfo = styled.div`
  margin-left: 8px;
  display: flex;
  flex-direction: column;
  span {
    margin-bottom: 3px;
  }
`;

export const TrackName = styled.span`
  color: white;
  font-weight: 600;
`;

export const TrackDeleteButton = styled.button`
  color: #ff5252;
  font-weight: 600;
`;

export const TrackGenreList = styled.div`
  display: inline;
`;
