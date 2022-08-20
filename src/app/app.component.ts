import { Component } from '@angular/core';
import {AudioService} from './audio.service';

@Component({
  selector: 'ram-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'ram';
  constructor(public audioService: AudioService) {}


}
