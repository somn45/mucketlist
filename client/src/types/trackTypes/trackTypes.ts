export interface AlbumImage {
  height: number;
  url: string;
  width: number;
}

export interface Artist {
  name: string;
  id: string;
  external_urls: {
    spotify: string;
  };
}

export interface ITrack {
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

export interface ICustomTrack {
  name: string;
  id: string;
  artists: string[];
  genres: string[];
  artistId: string;
  releaseDate: string;
  image: string;
}
