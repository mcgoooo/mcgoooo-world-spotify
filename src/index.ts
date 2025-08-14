import { Hono } from "hono";
import { callbackRoute } from "./routes/callback";
import { loginRoute } from "./routes/login";
import { currentUserRoute } from "./routes/user";
import { currentUserPlaylistsRoute } from "./routes/user/palylists";
import { Env } from "./types/Env";

const app = new Hono<{ Bindings: Env }>();
[loginRoute, callbackRoute, currentUserRoute,currentUserPlaylistsRoute].forEach((route) => {
  app.route("/", route);
});

export default app;
