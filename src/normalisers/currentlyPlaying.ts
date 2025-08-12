import { CurrentlyPlaying } from "../types/currentlyPlaying";

export const currentlyPlayingNormaliser = (data: any): CurrentlyPlaying => {
  return {
    isPlaying: data.is_playing,
    spotifyUrl: data.context?.external_urls?.spotify,
    spotifyApiUrl: data.context?.href,
    uri: data.context?.uri,
    progress: data.progress_ms,
    album: {
      spotifyUrl: data.item?.album?.artists?.[0]?.external_urls?.spotify,
      spotifyApiUrl: data.item?.album?.artists?.[0]?.href,
      uri: data.item?.album?.artists?.[0]?.uri,
      artists: data.item?.album?.artists?.map((artist: any) => ({
        name: artist.name.toLowerCase(),
        spotifyUri: artist.uri,
      })),
      images: {
        large: data.item?.album?.images?.[0]?.url,
        medium: data.item?.album?.images?.[1]?.url,
        small: data.item?.album?.images?.[2]?.url,
      },
      name: data.item?.album?.name,
      release_date: data.item?.album?.release_date,
      isrc: data.item?.external_ids?.isrc,
      trackNumber: data.item?.track_number,
    },
    trackUri: data.item?.uri,
    name: data.item?.name,
    spotifyTrackUrl: data.item?.external_urls?.spotify,
  };
};
