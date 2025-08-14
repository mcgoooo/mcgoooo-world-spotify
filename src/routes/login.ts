import { Hono } from "hono";
import { setCookie } from "hono/cookie";
import { Env } from "../types/Env";

import { getEnvKey } from "../utils/env";
import { randomString } from "../utils/string";
import { loginUrl } from "../utils/urls";

const scopes = ["user-read-currently-playing"].join(" ");

export const loginRoute = new Hono<{ Bindings: Env }>();

loginRoute.get("/login", (c) => {
  const state = randomString(16);
  const returnTo = c.req.query('return_to');
  console.log(returnTo,"returnTo");
  if (returnTo) {
      setCookie(c, "return_to", returnTo);
  }
  return c.redirect(
    loginUrl(
      getEnvKey(c, "CLIENT_ID"),
      getEnvKey(c, "REDIRECT_URI"),
      state,
      scopes,
    ),
  );
});
