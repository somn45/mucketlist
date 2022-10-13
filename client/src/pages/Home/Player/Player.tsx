import { useState, useEffect, useContext } from 'react';
import { connect, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Icon from '../../../components/atom/Icon';
import { PlayerContext } from '../../../PlayerContext';
import {
  moveNextPosition,
  movePreviousPosition,
  switchShuffleMode,
  swtichRepeatMode,
} from '../../../store/reducers/rootReducer';
import isArrayEmpty from '../../../utils/functions/isArrayEmpty';
import play from '../../../utils/functions/play';
import { TrackState } from '../TrackList/TrackList';
import ArtistName from './ArtistName/ArtistName';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';

import NextTrackButton from './NextTrackButton/NextTrackButton';
import PrevTrackButton from './PrevTrackButton/PrevTrackButton';
import RepeatMode from './RepeatMode/RepeatMode';
import ShuffleMode from './ShuffleMode/ShuffleMode';
import TogglePlayButton from './TogglePlayButton/TogglePlayButton';
import TrackName from './TrackName/TrackName';
import VolumeButton from './VolumeButton/VolumeButton';
import VolumeMixer from './VolumeMixer/VolumeMixer';
import VolumeMixerWrap from './VolumeMixerWrap/VolumeMixerWrap';

interface PlayerState {
  tracks: TrackState[];
  playback: {
    playingPosition: number;
    playMode: string;
  };
}

const PlayerWrap = styled.div`
  width: 370px;
  height: 80px;
  background-color: white;
  border: 5px solid green;
  border-radius: 25px;
  position: fixed;
  bottom: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const PlayerController = styled.div`
  width: 300px;
  display: flex;
  justify-content: space-around;
  position: relative;
  & > button {
    width: 20px;
    height: 20px;
  }
`;

function Player({ tracks, playback }: PlayerState) {
  const dispatch = useDispatch();
  const [isPlay, setIsPlay] = useState(false);
  const [progress, setProgress] = useState(0);
  const [prevVolume, setPrevVolume] = useState(0);
  const [currentVolume, setCurrentVolume] = useState(0.5);
  const [isShowVolumeMixer, setIsShowVolumeMixer] = useState(false);
  const [isFinishTrackPlay, setIsFinishTrackPlay] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [playingTrack, setPlayingTrack] = useState('');
  const [artist, setArtist] = useState('');
  const { player, deviceId } = useContext(PlayerContext);

  useEffect(() => {
    if (!player) return;
    detectFinishTrackPlay(player);
  }, [deviceId]);

  useEffect(() => {
    if (isArrayEmpty(tracks)) return;
    setPlayingTrack(tracks[playback.playingPosition].name);
    const artistData = tracks[playback.playingPosition].artists.map(
      (artist) => artist.name
    );
    setArtist(artistData.length < 2 ? artistData[0] : artistData.join(','));
    onPlay(tracks[playback.playingPosition].uri);
  }, [playback.playingPosition]);

  useEffect(() => {
    if (!isFinishTrackPlay) return;
    setIsFinishTrackPlay(false);
    if (isRepeat) {
      dispatch(swtichRepeatMode());
      onPlay(tracks[playback.playingPosition].uri);
    } else if (isShuffle) dispatch(switchShuffleMode());
    else dispatch(moveNextPosition(1));
  }, [isFinishTrackPlay]);

  const detectFinishTrackPlay = (player: Spotify.Player) => {
    player.addListener('player_state_changed', async (state) => {
      if (!player) return;
      console.log('Player state changed', state);
      console.log('Playing Track', state.track_window.current_track.name);
      if (state.duration <= state.position) {
        setProgress(0);
        setIsFinishTrackPlay(true);
      }
    });
  };

  const onPlay = (uri: string): void => {
    if (!player) return;
    if (progress === 0 || progress === undefined) {
      {
        play({
          spotify_uri: uri,
          device_id: deviceId,
          playerInstance: player,
        });
      }
    } else {
      player?.resume();
      console.log('resume');
    }
    setIsPlay(true);
  };

  const onPause = async () => {
    const trackProgress = await getTrackProgress();
    if (!trackProgress) setProgress(0);
    else setProgress(trackProgress);
    player?.pause();
    setIsPlay(false);
  };

  const getTrackProgress = async () => {
    const data = await player?.getCurrentState();
    if (!data) return;
    return data.position;
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const volume = Number(e.target.value);
    setCurrentVolume(volume);

    player?.setVolume(volume);
  };
  const toggleVolume = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!player) return;
    const volume = await player.getVolume();
    if (volume === 0) await player.setVolume(prevVolume);
    else await player.setVolume(0);
    setPrevVolume(volume);
    setCurrentVolume(await player.getVolume());
  };
  const onPreviousTrack = () => {
    setProgress(0);
    dispatch(movePreviousPosition(1));
    setIsPlay(true);
  };
  const onNextTrack = () => {
    setProgress(0);
    console.log('on next track', playback.playingPosition);
    dispatch(moveNextPosition(1));
    setIsPlay(true);
  };
  const handleRepeatMode = () => {
    setIsRepeat((prevState) => !prevState);
    setIsShuffle(false);
  };
  const handleShuffleMode = async () => {
    setIsShuffle((prevState) => !prevState);
    setIsRepeat(false);
  };

  return (
    <PlayerWrap>
      <TrackName text={playingTrack} />
      <ArtistName text={artist} />
      <PlayerController>
        <TogglePlayButton
          value={isPlay ? <Icon icon={faPause} /> : <Icon icon={faPlay} />}
          onClick={
            isPlay
              ? onPause
              : () => onPlay(tracks[playback.playingPosition].uri)
          }
        />
        <PrevTrackButton onClick={onPreviousTrack} />
        <NextTrackButton onClick={onNextTrack} />
        <RepeatMode onClick={handleRepeatMode} />
        <ShuffleMode onClick={handleShuffleMode} />
        <VolumeMixerWrap
          onMouseEnter={() => setIsShowVolumeMixer(true)}
          onMouseLeave={() => setIsShowVolumeMixer(false)}
        >
          <VolumeButton onClick={toggleVolume} />
          {isShowVolumeMixer ? (
            <VolumeMixer currentRange={currentVolume} onChange={handleVolume} />
          ) : (
            <></>
          )}
        </VolumeMixerWrap>
      </PlayerController>
    </PlayerWrap>
  );
}

const mapStateToProps = (state: PlayerState) => {
  return {
    tracks: state.tracks,
    playback: state.playback,
  };
};

export default connect(mapStateToProps)(Player);
