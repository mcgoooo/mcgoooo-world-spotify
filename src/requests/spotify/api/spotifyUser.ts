import { SpotifyUser } from "../../../types/SpotifyUser";
import { spotifyHeaders } from "../utils/fetch";
import { spotifyUserUrl } from "../utils/url";

export const spotifyUser = async (
  accessToken: string,
): Promise<SpotifyUser> => {
  const response = await fetch(spotifyUserUrl(),spotifyHeaders(accessToken));

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);

  }
  const data = (await response.json());
  
  return data as SpotifyUser;
}
