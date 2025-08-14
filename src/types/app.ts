import { Context } from "hono";
import { BlankInput } from "hono/types";
import { Env } from "./Env";

export type AppContext = Context<
  {
    Bindings: Env;
  },
  string,
  BlankInput
>;
