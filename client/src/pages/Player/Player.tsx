import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import usePlay from '../../hooks/usePlay';
import useSpotifyPlayBack from '../../hooks/useSpotifyPlayback';
import { RootState, setPlayingTrack } from '../../store/reducers/rootReducer';

import { useAppDispatch } from '../../store/store';
import PlayerColumn from './Column/PlayerColumn';
import PlayerController from './PlayerController/PlayerController';
import PlayerTrackImage from './PlayerTrackImage/PlayerTrackImage';
import PlayerTrackInfo from './PlayerTrackInfo/PlayerTrackInfo';
import PlayerWrap from './Wrap/PlayerWrap';

export default function Player() {
  const dispatch = useAppDispatch();
  const { tracks, playingTrack, isPlay } = useSelector(
    (state: RootState) => state
  );
  const [player, deviceId, loading, state] = useSpotifyPlayBack();
  const [plays, _] = usePlay(player, deviceId, tracks);

  useEffect(() => {
    if (!state || !state.track_window.current_track) return;
    if (playingTrack.trackName !== state.track_window.current_track.name) {
      createPlayingTrackData(state);
    }
  }, [state]);

  const createPlayingTrackData = (state: Spotify.PlaybackState) => {
    const currentTrack = state.track_window.current_track;
    const artistData = currentTrack.artists.map((artist) => artist.name);
    const playingTrackData = {
      trackName: currentTrack.name,
      artist: artistData.length < 2 ? artistData[0] : artistData.join(','),
      trackImage: currentTrack.album.images[1].url,
    };
    dispatch(setPlayingTrack(playingTrackData));
  };

  if (loading) return <div>로딩 중</div>;
  return (
    <PlayerWrap isPlay={isPlay}>
      <PlayerColumn>
        <PlayerTrackImage
          trackName={playingTrack.trackName}
          trackImage={playingTrack.trackImage}
        />
      </PlayerColumn>
      <PlayerColumn>
        <PlayerTrackInfo
          trackName={playingTrack.trackName}
          artist={playingTrack.artist}
        />
        <PlayerController player={player} deviceId={deviceId} onPlay={plays} />
      </PlayerColumn>
    </PlayerWrap>
  );
}
