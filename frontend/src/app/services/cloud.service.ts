import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Song } from '../interfaces/transferInterfaces/song';
import { SongsList } from '../interfaces/transferInterfaces/SongsList';

@Injectable({
  providedIn: 'root',
})
export class CloudService {
  private SONGS_URL = 'http://localhost:3000/public/songs';
  constructor(private http: HttpClient) {}
  getFiles(): Observable<Song[]> {
    return this.http
      .get<SongsList>(this.SONGS_URL)
      .pipe(map((res: SongsList) => res.data));
  }
}
