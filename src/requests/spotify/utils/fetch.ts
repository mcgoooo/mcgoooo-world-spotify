export const spotifyHeaders = (accessToken: string) => {
  return {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
};
