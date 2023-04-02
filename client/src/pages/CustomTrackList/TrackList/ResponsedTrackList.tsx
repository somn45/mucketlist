import CustomTrackItem from '../../../components/CustomTrackItem';
import {
  NormalCustomTrackList,
  MobileCustomTrackList,
  WideScreenCustomTrackList,
} from '../../../styles/customTracks/cusomTrackStyle';
import { ICustomTrack } from '../../../types/trackTypes/trackTypes';
import isArrayEmpty from '../../../utils/functions/isArrayEmpty';

interface CustomTracksProps {
  customTracks: ICustomTrack[];
  isMobile: boolean;
  isWideScreen: boolean;
}

function ResponsedTrackList({
  customTracks,
  isMobile,
  isWideScreen,
}: CustomTracksProps) {
  const CustomTrackItemMaps =
    !customTracks || isArrayEmpty(customTracks) ? (
      <span>찜한 트랙 목록이 존재하지 않습니다..</span>
    ) : (
      customTracks.map((track: ICustomTrack) => (
        <CustomTrackItem key={track.id} track={track} />
      ))
    );

  return isMobile ? (
    <MobileCustomTrackList>{CustomTrackItemMaps}</MobileCustomTrackList>
  ) : isWideScreen ? (
    <WideScreenCustomTrackList>{CustomTrackItemMaps}</WideScreenCustomTrackList>
  ) : (
    <NormalCustomTrackList>{CustomTrackItemMaps}</NormalCustomTrackList>
  );
}

export default ResponsedTrackList;
