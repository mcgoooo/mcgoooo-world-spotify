import { Hono } from "hono";
import { Env } from "../types/env";
import { getEnvKey } from "../utils/env";
import { randomString } from "../utils/string";
import { loginUrl } from "../utils/urls";

const scopes = ["user-read-currently-playing"].join(" ");

export const loginRoute = new Hono<{ Bindings: Env }>();

loginRoute.get("/login", (c) => {
  const state = randomString(16);
  return c.redirect(
    loginUrl(
      getEnvKey(c, "CLIENT_ID"),
      getEnvKey(c, "REDIRECT_URI"),
      state,
      scopes,
    ),
  );
});
