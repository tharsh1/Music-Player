import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, concat } from 'rxjs';
import { map } from 'rxjs/operators';
import { base } from '../interfaces/transferInterfaces/base';
import { Playlist } from '../interfaces/transferInterfaces/Playlist';
import { Song } from '../interfaces/transferInterfaces/song';
import { SongsList } from '../interfaces/transferInterfaces/SongsList';
import { UserServerRequestsService } from './user-server-requests.service';

@Injectable({
  providedIn: 'root',
})
export class CloudService {
  private BASE_URL = 'http://localhost:3000/public';
  constructor(
    private http: HttpClient,
    private userCalls: UserServerRequestsService
  ) {}
  getFiles(): Observable<Song[]> {
    return this.http
      .get<SongsList>(this.BASE_URL + '/songs')
      .pipe(map((res: SongsList) => res.data));
  }

  getPlayLists(): Observable<Playlist[]> {
    const userPlaylists: Observable<Playlist[]> = this.userCalls
      .get<Playlist[]>('/user/playlists')
      .pipe(map((res) => res.data));
    userPlaylists.subscribe((data) => {
      console.log(data);
    });

    const predefinedPlaylists = this.http
      .get<base<Playlist[]>>(this.BASE_URL + '/playlists')
      .pipe(map((res: base<Playlist[]>) => res.data));

    concat(predefinedPlaylists, userPlaylists).subscribe((data) => {
      console.log(data);
    });
    return concat(predefinedPlaylists, userPlaylists);
  }

  getPlaylistSongs(playlistId: String): Observable<Song[]> {
    return this.http
      .get<SongsList>(`${this.BASE_URL}/playlist/${playlistId}`)
      .pipe(map((res: SongsList) => res.data));
  }

  addToPlaylist(playlistId: String, songId: String): Promise<base<any>> {
    return this.http
      .post<base<any>>(`${this.BASE_URL}/playlist/${playlistId}`, { songId })
      .toPromise();
  }

  createPlaylist(name: String): Promise<base<any>> {
    return this.http
      .post<base<any>>(`${this.BASE_URL}/playlists`, { name })
      .toPromise();
  }
}
