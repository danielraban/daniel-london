export type Playlist = {
  name: string;
  tagline: string;
  url: string;
};

export const playlists: Playlist[] = [
  {
    name: "House",
    tagline: "Peak time",
    url: "https://open.spotify.com/playlist/37i9dQZF1EQpoj8u9Hn81e",
  },
  {
    name: "Metal",
    tagline: "Riffs and volume",
    url: "https://open.spotify.com/playlist/37i9dQZF1EQpgT26jgbgRI",
  },
  {
    name: "Techno",
    tagline: "Warehouse hours",
    url: "https://open.spotify.com/playlist/2EUiSUBXlDIzSKiyXhF5hJ",
  },
];
