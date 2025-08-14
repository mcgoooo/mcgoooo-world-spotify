import { Hono } from "hono";
import { getCookie, setCookie } from "hono/cookie";
import { authTokenExhange } from "../requests/spotify/api/authTokenExchange";
import { spotifyUser } from "../requests/spotify/api/spotifyUser";
import { Env } from "../types/Env";
import { getEnvKey } from "../utils/env";
import { tokenExchangeErrorUrl } from "../utils/urls";

export const callbackRoute = new Hono<{ Bindings: Env }>();

callbackRoute.get("/callback", async (c) => {
  if (c.req.query("state") === null) return c.redirect(tokenExchangeErrorUrl);

  const tokenJson = await authTokenExhange(
    getEnvKey(c, "CLIENT_ID"),
    getEnvKey(c, "CLIENT_SECRET"),
    getEnvKey(c, "REDIRECT_URI"),
    c.req.query("code")!,
  );
  const cookieOptions: { domain?: string; secure: boolean } = { secure: true };

  setCookie(c, "spotify_access_token", tokenJson.access_token, cookieOptions);
  setCookie(c, "spotify_refresh_token", tokenJson.refresh_token, cookieOptions);
  const returnTo = getCookie(c, "return_to");
  if (returnTo) {
    return c.redirect(returnTo, 302);
  }

  const data = await spotifyUser(tokenJson.access_token);
  return c.text(JSON.stringify(data, null, 2));
});
