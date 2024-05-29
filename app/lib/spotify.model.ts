// Root interface for the entire response
export interface RecentlyPlayedResponse {
    items: PlayHistory[];
    next: string;
    cursors: Cursors;
    limit: number;
    href: string;
  }
  
  // Interface for play history items
  export interface PlayHistory {
    track: Track;
    played_at: string;
    context: Context;
  }
  
  // Interface for track details
  export interface Track {
    album: Album;
    artists: Artist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: ExternalIds;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    is_playable: boolean;
    linked_from: any; // Can be more detailed if needed
    restrictions: any; // Can be more detailed if needed
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
    is_local: boolean;
  }
  
  // Interface for album details
  export interface Album {
    album_type: string;
    artists: Artist[];
    available_markets: string[];
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
  }
  
  // Interface for artist details
  export interface Artist {
    external_urls: ExternalUrls;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
  }
  
  // Interface for external URLs
  export interface ExternalUrls {
    spotify: string;
  }
  
  // Interface for image details
  export interface Image {
    url: string;
    height: number;
    width: number;
  }
  
  // Interface for external IDs
  export interface ExternalIds {
    isrc: string;
  }
  
  // Interface for context details
  export interface Context {
    type: string;
    href: string;
    external_urls: ExternalUrls;
    uri: string;
  }
  
  // Interface for cursors used for pagination
  export interface Cursors {
    after: string;
    before: string;
  }
  