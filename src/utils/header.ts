import { Buffer } from "node:buffer";

export const createBearerTokenHeader = (
  clientId: string,
  clientSecret: string,
): string => {
  const authorization = clientId + ":" + clientSecret;
  const authBuffer = Buffer.from(authorization).toString("base64");
  return "Basic " + authBuffer;
};
