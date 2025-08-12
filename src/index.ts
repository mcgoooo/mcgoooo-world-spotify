import { Hono } from "hono";
import { callbackRoute } from "./routes/callback";
import { currentlyPlayingRoute } from "./routes/currentlyPlaying";
import { loginRoute } from "./routes/login";
import { Env } from "./types/env";

const app = new Hono<{ Bindings: Env }>();
[loginRoute, callbackRoute, currentlyPlayingRoute].forEach((route) => {
  app.route("/", route);
});

export default app;
