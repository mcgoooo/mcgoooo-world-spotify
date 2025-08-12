export type CurrentlyPlaying = {
  isPlaying: boolean;
  spotifyUrl: string;
  spotifyApiUrl: string;
  uri: string;
  progress: number | undefined;
  album: {
    spotifyUrl: string | undefined;
    spotifyApiUrl: string | undefined;
    uri: string | undefined;
    artists: { name: string; spotifyUri: string }[];
    images: {
      large: string | undefined;
      medium: string | undefined;
      small: string | undefined;
    };
    release_date: string | undefined;
    name: string | undefined;
    isrc: string | undefined;
    trackNumber: number | undefined;
  };
  trackUri: string ;
  name: string;
  spotifyTrackUrl: string ;
};
