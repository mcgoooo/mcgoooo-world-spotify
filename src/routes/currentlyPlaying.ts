import { Hono } from "hono";
import { getCookie } from "hono/cookie";
import { currentlyPlayingNormaliser } from "../normalisers/currentlyPlaying";
import { getCurrentlyPlaying } from "../requests/spotify/api/currentlyPlaying";
import { Env } from "../types/env";

export const currentlyPlayingRoute = new Hono<{ Bindings: Env }>();

currentlyPlayingRoute.get("/currently-playing", async (c) => {
  const token = getCookie(c, "spotify_access_token");
  if (!token) {
    return c.text("" + JSON.stringify(getCookie(c)), 401);
  }
  const data = await getCurrentlyPlaying(token);
  return c.json(currentlyPlayingNormaliser(data));
});


