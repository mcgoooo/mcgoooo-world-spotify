export const getCurrentlyPlaying = async (
  accessToken: string,
): Promise<any> => {
  const response = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`HTTP error! status: ${response.status}`);

  }
  const data = await response.json();
  
  return data;
};
