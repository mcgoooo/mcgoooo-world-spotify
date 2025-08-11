import { Hono } from "hono";
import { setCookie } from "hono/cookie";
import { authTokenExhange } from "./requests/spotify/authTokenExchange";
import { Env } from "./types/env";
import { getEnvKey } from "./utils/env";
import { randomString } from "./utils/string";
import { loginUrl, tokenExchangeErrorUrl } from "./utils/urls";

const scopes = [
  "user-read-currently-playing",
].join(" ");

const app = new Hono<{ Bindings: Env }>();

app.get("/login", (c) => {
  const state = randomString(16)
  return c.redirect(
    loginUrl(
      getEnvKey(c, "CLIENT_ID"),
      getEnvKey(c, "REDIRECT_URI"),
      state,
      scopes
    ),
  );
});

app.get("/callback", async (c) => {
  if (c.req.query("state") === null) return c.redirect(tokenExchangeErrorUrl);

  const tokenJson = await authTokenExhange(
    getEnvKey(c, "CLIENT_ID"),
    getEnvKey(c, "CLIENT_SECRET"),
    getEnvKey(c, "REDIRECT_URI"),
    c.req.query("code")!,
  );
  const cookieOptions: { domain?: string, secure: boolean } = { secure: true};
  if (getEnvKey(c, "COOKIE_DOMAIN"))
    cookieOptions.domain = getEnvKey(c, "COOKIE_DOMAIN");

  setCookie(c, "spotify_access_token", tokenJson.access_token, cookieOptions);
  setCookie(c, "spotify_refresh_token", tokenJson.refresh_token, cookieOptions);
  return c.text(JSON.stringify(tokenJson, null, 2));
});

export default app;
