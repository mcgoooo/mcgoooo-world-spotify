export const spotifyUserUrl = () => 
  "https://api.spotify.com/v1/me";

export const spotifyUserPlaylistUrl = (offset:number) =>  
  `https://api.spotify.com/v1/me/playlists?limit=50&offset=${offset}`;
