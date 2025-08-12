import { Hono } from "hono";
import { setCookie } from "hono/cookie";
import { getCurrentlyPlaying } from "../requests/spotify/api/currentlyPlaying";
import { authTokenExhange } from "../requests/spotify/authTokenExchange";
import { Env } from "../types/env";
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
  if (getEnvKey(c, "COOKIE_DOMAIN"))
    cookieOptions.domain = getEnvKey(c, "COOKIE_DOMAIN");
  console.log(tokenJson)
  setCookie(c, "spotify_access_token", tokenJson.access_token, cookieOptions);
  setCookie(c, "spotify_refresh_token", tokenJson.refresh_token, cookieOptions);
  const data = await getCurrentlyPlaying(tokenJson.access_token);
  return c.text(JSON.stringify(data, null, 2));
});
