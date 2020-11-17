import { Component, OnInit } from '@angular/core';
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
  constructor(
    public audioService: AudioService,
    public cloudService: CloudService
  ) {
    // listen to stream state
    this.audioService.getState().subscribe((state) => {
      this.state = state;
    });
  }
  playStream(file) {
    this.audioService.playStream(file.audioUrl).subscribe((events: Event) => {
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

  openFile(file, index) {
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

  isLastPlaying() {
    return this.currentFile.index === this.files.length - 1;
  }
  onSliderChangeEnd(change) {
    this.audioService.seekTo(change.value);
  }

  ngOnInit() {
    this.getSongs();
    this.getPlaylists();
  }
}
