import { Hono } from "hono";
import { getCookie } from "hono/cookie";
import { spotifyUser } from "../requests/spotify/api/spotifyUser";
import { Env } from "../types/Env";

export const currentUserRoute = new Hono<{ Bindings: Env }>();

currentUserRoute.get("/current-user", async (c) => {
  const denied = (error: string) => c.json({ user: false, error }, 404);
  const token = getCookie(c, "spotify_access_token");

  if (!token) return denied('token')
  try {
    
    const user = await spotifyUser(token);
    if (!user) return denied('user');
    return c.json(user);

  } catch (error) {
    console.log(error)
    return denied('error');
  }
});
