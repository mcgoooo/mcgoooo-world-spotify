import { currentlyPlayingNormaliser } from "../../../normalisers/currentlyPlaying";
import { CurrentlyPlaying } from "../../../types/currentlyPlaying";
import { spotifyHeaders } from "../utils/fetch";
import { currentlyPlayingUrl } from "../utils/url";

export const getCurrentlyPlaying = async (
  accessToken: string,
): Promise<CurrentlyPlaying> => {
  const response = await fetch(currentlyPlayingUrl(),spotifyHeaders(accessToken));

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);

  }
  const data = (await response.json());
  const normalised = currentlyPlayingNormaliser(data)
  
  return normalised;
}
