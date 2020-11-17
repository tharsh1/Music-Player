import { Song } from './song';

export interface Playlist {
  _id: String;
  name: String;
  songs: Song[];
}
