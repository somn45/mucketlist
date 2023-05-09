import { Cookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { useMutation } from 'react-query';

import CustomTrackGenre from './CustomTrackGenre';

import {
  TrackItem,
  TrackColumn,
  TrackInfo,
  TrackName,
  TrackDeleteButton,
  TrackGenreList,
} from '../styles/customTracks/cusomTrackStyle';
import { ICustomTrack } from '../types/trackTypes/trackTypes';

import { updateStatusMessage } from '../store/reducers/rootReducer';
import { queryClient } from '..';
import { deleteCustomTracks } from '../API';

interface CustomTrackItemProps {
  track: ICustomTrack;
}

const cookies = new Cookies();

function CustomTrackItem({ track }: CustomTrackItemProps) {
  const dispatch = useDispatch();

  const requestDeleteCustomTrack = async (id: string) => {
    const firebaseUid = cookies.get('firebaseUid');
    const customTracks = await deleteCustomTracks(firebaseUid, id);
    return customTracks;
  };

  const deleteCustomTrackMutate = useMutation(
    (id: string) => requestDeleteCustomTrack(id),
    {
      onMutate: async () => {
        queryClient.cancelQueries('customTracks');
      },
      onSuccess: () => {
        dispatch(
          updateStatusMessage(
            `${track.name}이 찜한 트랙 리스트에서 삭제되었습니다.`
          )
        );
      },
      onSettled: () => queryClient.invalidateQueries(),
    }
  );

  return (
    <TrackItem>
      <TrackColumn>
        <img src={track.image} alt={track.name} />
        <TrackInfo>
          <div>
            <TrackName>{track.name}</TrackName>
            <TrackDeleteButton
              onClick={() => deleteCustomTrackMutate.mutate(track.id)}
            >
              X
            </TrackDeleteButton>
          </div>
          <span>{`아티스트 ${track.artists}`}</span>
          <span>{`발매일 ${track.releaseDate}`}</span>
        </TrackInfo>
      </TrackColumn>
      <TrackGenreList>
        {track.genres.slice(0, 4).map((genre) => (
          <CustomTrackGenre key={genre} genre={genre} />
        ))}
      </TrackGenreList>
    </TrackItem>
  );
}

export default CustomTrackItem;
