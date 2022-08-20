import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  // @todo: make private? introduce getter/setter? control over UI/config/both?
  muted = true;
  readonly tracks: { name: string, url: string }[] = [
    {
      name: 'portal-gun',
      url: 'assets/sfx-portal-gun.mp3'
    }
  ];
  constructor() { }
  // todo: unit-test it!
  play(trackName: string): Promise<{endPromise: Promise<void>}> {
    if (this.muted) { return Promise.resolve({endPromise: Promise.resolve()}); }
    const trackElement = document.getElementById(`audio-${trackName}`) as HTMLAudioElement;
    if (!trackElement) { throw  new Error(`No element with id: audio-${trackName}`); }
    const startPromise = new Promise<{endPromise: Promise<void>}>((startResolve) => {
      trackElement.play().then(() => {
        const endPromise = new Promise<void>((endResolve) => {
          setTimeout(() => {
            trackElement.pause();
            trackElement.currentTime = 0;
            endResolve();
          }, trackElement.duration * 1000);
        });
        startResolve({endPromise});
      });
    });
    return startPromise;
  }
}
