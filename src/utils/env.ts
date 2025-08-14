import { AppContext } from "../types/app";
import { Env } from "../types/Env";

export const getEnvKey = (c: AppContext, envKey: keyof Env) => c.env[envKey];

export const getAllEnv = (c: AppContext) => c.env;
