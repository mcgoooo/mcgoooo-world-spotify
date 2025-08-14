import { Hono } from "hono";
import { setCookie } from "hono/cookie";
import { html, raw } from 'hono/html';
import { Env } from "../types/Env";

import { getEnvKey } from "../utils/env";
import { randomString } from "../utils/string";
import { loginUrl } from "../utils/urls";

const scopes = ["user-read-currently-playing"].join(" ");

export const loginRoute = new Hono<{ Bindings: Env }>();
const cookieOptions: { secure: boolean } = { secure: true };

loginRoute.get("/login", (c) => {
  const state = randomString(16);
  const returnTo = c.req.query('return_to');
  const url =    loginUrl(
      getEnvKey(c, "CLIENT_ID"),
      getEnvKey(c, "REDIRECT_URI"),
      state,
      scopes,
    )

    if (returnTo) {

    setCookie(c, "return_to", returnTo, cookieOptions);
  }

   return c.html(
    html`
      <!doctype html>
        <meta charset="utf-8">
        <title>Redirecting to spotify login</title>
        <script>
          setTimeout(() => location.href = "${raw(url)}", 1);
        </script>
    `
  )


});
