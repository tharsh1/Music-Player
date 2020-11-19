import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AudioService } from '../../services/audio.service';
import { CloudService } from '../../services/cloud.service';
import { StreamState } from '../../interfaces/stream-state';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Song } from 'src/app/interfaces/transferInterfaces/song';
import { Playlist } from 'src/app/interfaces/transferInterfaces/Playlist';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent {
  files: Song[] = [];
  playlists: Playlist[];
  state: StreamState;
  currentFile: any = {};
  currentPlaylistId: String;
  addNewPlaylistToggle: boolean = false;
  constructor(
    public audioService: AudioService,
    public cloudService: CloudService,
    private cdr: ChangeDetectorRef
  ) {
    // listen to stream state
    this.audioService.getState().subscribe((state) => {
      this.state = state;
    });
  }
  playStream(file) {
    this.audioService.playStream(file.audioURL).subscribe((events: Event) => {
      if (events.type == 'ended') {
        this.currentFile = {
          file: this.files[this.currentFile.index + 1],
          index: this.currentFile.index + 1,
        };
        this.playStream(this.currentFile.file);
      }
    });
  }

  getSongs() {
    this.cloudService.getFiles().subscribe((files) => {
      console.log('here');
      this.files = files;
    });
  }

  getPlaylists() {
    this.cloudService.getPlayLists().subscribe((playlists) => {
      this.playlists = playlists;
    });
  }
  toggleAddPlayList() {
    this.addNewPlaylistToggle = !this.addNewPlaylistToggle;
  }

  openFile(file, index) {
    console.log(file);
    this.currentFile = { index, file };
    this.audioService.stop();
    this.playStream(file);
  }
  pause() {
    this.audioService.pause();
  }
  play() {
    this.audioService.play();
  }
  stop() {
    this.audioService.stop();
  }
  next() {
    const index = this.currentFile.index + 1;
    const file = this.files[index];
    this.openFile(file, index);
  }
  previous() {
    const index = this.currentFile.index - 1;
    const file = this.files[index];
    this.openFile(file, index);
  }

  isFirstPlaying() {
    return this.currentFile.index === 0;
  }
  loadPlaylist(playlistId: String) {
    this.currentPlaylistId = playlistId;
    this.cloudService.getPlaylistSongs(playlistId).subscribe((songs) => {
      this.files = songs;
    });
  }

  addNewPlaylist(playlistName) {
    console.log(playlistName);
    const promise = this.cloudService.createPlaylist(playlistName);
    this.playlists = [
      ...this.playlists,
      {
        name: playlistName,
        _id: playlistName + Math.random(),
        songs: [],
      },
    ];
    this.toggleAddPlayList();
  }

  isLastPlaying() {
    return this.currentFile.index === this.files.length - 1;
  }
  onSliderChangeEnd(change) {
    this.audioService.seekTo(change.value);
  }

  addToPlaylist(song: Song, index: number) {
    // this.playlists[index].songs.push(song);
    // this.cdr.detectChanges();
    // console.log(this.playlists[index]);
    this.cloudService.addToPlaylist(this.playlists[index]._id, song._id);
  }

  ngOnInit() {
    this.getSongs();
    this.getPlaylists();
    console.log('hlo');
  }
}
