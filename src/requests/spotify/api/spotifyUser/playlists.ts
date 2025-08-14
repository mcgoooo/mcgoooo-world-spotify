import { SpotifyPlaylistResponse } from "../../../../types/SpotifyUser/Playlist";
import { spotifyHeaders } from "../../utils/fetch";
import { spotifyUserPlaylistUrl } from "../../utils/url";

export const spotifyUserPlaylists = async (
  accessToken: string,
  offset: number
): Promise<SpotifyPlaylistResponse> => {
  const response = await fetch(spotifyUserPlaylistUrl(offset),spotifyHeaders(accessToken));

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);

  }
  const data = (await response.json());
  
  return data as SpotifyPlaylistResponse;
}
