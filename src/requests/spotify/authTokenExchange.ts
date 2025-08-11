import { createBearerTokenHeader } from "../../utils/header";

export const authTokenExhange = async (
  clientId: string,
  clientSecret: string,
  redirectUri: string,
  code: string,
) => {
  const url = "https://accounts.spotify.com/api/token";

  const headers = {
    "content-type": "application/x-www-form-urlencoded",
    Authorization: createBearerTokenHeader(clientId, clientSecret),
  };

  const body = {
    code: code!,
    redirect_uri: redirectUri,
    grant_type: "authorization_code",
  };

  const tokenRespose = await fetch(url, {
    method: "post",
    headers,
    body: new URLSearchParams(body),
  });

  const json = (await tokenRespose.json()) as {
    access_token: string;
    refresh_token: string;
  };
  return json;
};
