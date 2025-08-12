import qs from "qs";

export const loginUrl = (
  client_id: string,
  redirect_uri: string,
  state: string,
  scopes: string,
): string => {
  return (
    "https://accounts.spotify.com/authorize?" +
    qs.stringify({
      response_type: "code",
      client_id,
      scope: scopes,
      redirect_uri,
      state,
    })
  );
};

export const tokenExchangeErrorUrl =
  "/#" + qs.stringify({ error: "state_mismatch" });
