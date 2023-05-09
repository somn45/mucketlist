import axiosInstance from './utils/instance/instance';
import {
  CustomTrack,
  CustomTracks,
  FirebaseUidData,
  SpotifyGenres,
  SpotifyTracks,
} from './types/model';
import spotifyInstance from './utils/instance/spotifyInstance';

export const addUser = async (email: string, password: string) => {
  await axiosInstance.post('/users/join', { email, password });
};

export const checkUser = async (email: string, password: string) => {
  const { data: firebaseUidData } = await axiosInstance.post<FirebaseUidData>(
    '/users/login',
    {
      email,
      password,
    }
  );
  return firebaseUidData.firebaseUid;
};

export const requestLogout = async (firebaseUid: string) => {
  await axiosInstance.post('/users/logout', { firebaseUid });
};

export const getSpotifyGenres = async () => {
  const { data: spotifyGenresData } = await axiosInstance.get<SpotifyGenres>(
    '/tracks/genres'
  );
  return spotifyGenresData.genres;
};

export const getSpotifyTracks = async (genres: string[]) => {
  const { data: spotifyTracksData } = await axiosInstance.get<SpotifyTracks>(
    `/tracks/search?genres=${JSON.stringify(genres)}`
  );
  return spotifyTracksData.tracks;
};

export const getCustomTracks = async (firebaseUid: string) => {
  const { data: customTracksData } = await axiosInstance.get<CustomTracks>(
    `/tracks/read?firebaseUid=${firebaseUid}`
  );
  return customTracksData.customTracks;
};

export const addCustomTrack = async (
  favoriteTrack: CustomTrack,
  firebaseUid: string
) => {
  const { data: newCustomTrackData } = await axiosInstance.post<{
    customTrack: CustomTrack;
  }>('/tracks/add', {
    track: favoriteTrack,
    firebaseUid,
  });
  return newCustomTrackData.customTrack;
};

export const deleteCustomTracks = async (firebaseUid: string, id: string) => {
  const urlParams = new URLSearchParams({ firebaseUid, id });
  const { data: customTracksData } = await axiosInstance.delete<CustomTracks>(
    `/tracks/delete?${urlParams}`
  );
  return customTracksData.customTracks;
};

export const setPlayer = async (deviceId: string, uris: string[]) =>
  await spotifyInstance.put(`/player/play?device_id=${deviceId}`, { uris });

export const setRepeatMode = async () =>
  await spotifyInstance.put('/player/repeat?state=track', {
    state: 'track',
  });

export const clearRepeatMode = async () =>
  await spotifyInstance.put('/player/repeat?state=off', {
    state: 'track',
  });

export const setShuffleMode = async () =>
  await spotifyInstance.put(`/player/shuffle?state=${true}`, {
    state: true,
  });

export const clearShuffleMode = async () =>
  await spotifyInstance.put(`/player/shuffle?state=${false}`, {
    state: false,
  });
