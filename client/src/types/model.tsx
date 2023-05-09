export interface FirebaseUidData {
  firebaseUid: string;
}

export interface User {
  email: string;
  password: string;
}

export interface SpotifyGenres {
  genres: string[];
}

export interface Artist {
  name: string;
  id: string;
  external_urls: {
    spotify: string;
  };
}

export interface AlbumImage {
  height: number;
  url: string;
  width: number;
}

export interface Track {
  id: string;
  name: string;
  popularity: number;
  artists: Artist[];
  album: {
    images: AlbumImage[];
    release_date: string;
  };
  uri: string;
}

export interface SpotifyTracks {
  tracks: Track[];
}

export interface CustomTrack {
  name: string;
  id: string;
  artists: string[];
  genres: string[];
  artistId: string;
  releaseDate: string;
  image: string;
}

export interface CustomTracks {
  customTracks: CustomTrack[];
}
