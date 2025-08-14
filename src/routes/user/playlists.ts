import { Hono } from "hono";
import { getCookie } from "hono/cookie";
import { spotifyUserPlaylists } from "../../requests/spotify/api/spotifyUser/playlists";
import { Env } from "../../types/Env";

export const currentUserPlaylistsRoute = new Hono<{ Bindings: Env }>();

// after we have the first set of playlists, we can get the rest of the playlists
// e.g. total = 191, output = [50, 100, 150]
const getOffsetsForRestOfPlaylists = (
  total: number,
  limit = 50,
): number[] | null => {
  if (total <= limit) return null;
  const fullOffsets = Array.from(
    { length: (total - limit) / limit + 1 },
    (_, i) => (i + 1) * limit,
  );
  return fullOffsets;
};

currentUserPlaylistsRoute.get("/current-user/playlists", async (c) => {
  const denied = c.json({ playlists: false }, 404);
  const token = getCookie(c, "spotify_access_token");
  if (!token) return denied;
  try {
    const firstPlaylists = await spotifyUserPlaylists(token, 0);

    const playlists = [...firstPlaylists.items];
    const offsets = getOffsetsForRestOfPlaylists(firstPlaylists.total);

    if (offsets) {
      const responses = await Promise.all(
        offsets.map((offset) => spotifyUserPlaylists(token, offset)),
      );
      responses.forEach((response) => {
        playlists.push(...response.items);
      });
    }
    return c.json(playlists);
  } catch (error) {
    return denied;
  }
});
