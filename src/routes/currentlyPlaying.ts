import { Hono } from "hono";
import { getCookie } from "hono/cookie";
import { getCurrentlyPlaying } from "../requests/spotify/api/currentlyPlaying";
import { Env } from "../types/Env";

export const currentlyPlayingRoute = new Hono<{ Bindings: Env }>();

currentlyPlayingRoute.get("/currently-playing", async (c) => {
  const token = getCookie(c, "spotify_access_token");
  if (!token) {
    return c.text("" + JSON.stringify(getCookie(c)), 401);
  }
  const currentlyPlaying = await getCurrentlyPlaying(token);

  if (!currentlyPlaying) {
    return c.text("No track currently playing", 404);
  }
  return c.json({
    ...currentlyPlaying
  });
});


