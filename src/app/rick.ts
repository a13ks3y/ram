import {Cell} from "./cell";
import {AudioService} from "./audio.service";
export class Rick {
  private portalZoom: number = 0.1;
  private portalX: number;
  private lastPortalUse: number = 0;
  private jumpDy: number;
  private jumpStartY: number;
  // todo do not use angular injection here, use regular object passed from universe and screen component, create interface
  constructor(private audioService: AudioService) {}
  static SIZE = Cell.CELL_WIDTH / 4
  state: string = 'idle'
  dx: number = 0
  dy: number = 0
  x: number = 0
  y: number = 0
  render(ctx: CanvasRenderingContext2D) {
    switch(this.state) {
      case 'idle': this.renderIdle(ctx); break;
      case 'portal': this.renderPortal(ctx); break;
      case 'portal_idle':  this.renderIdle(ctx); this.renderPortal(ctx); break;
      case 'falling': case 'jumping': this.renderFalling(ctx); break;
    }
  }
  logic(dtt: number) {
    const nx = this.dx * dtt;
    const ny = this.dy * dtt;

    this.x += this.dx / dtt;
    this.y += this.dy / dtt;
    switch (this.state) {
      case 'portal':
        this.portalZoom += 0.081;
        if (this.portalZoom >= 1.75) {
          this.state = 'portal_idle';
          this.dx = 0.2;
        }
        break;
      case 'portal_idle':
        break;
      case 'falling':
        break;
      case 'jumping':
        if (this.jumpStartY - this.y > Rick.SIZE * 8) {
          console.log('PEPAKA!', this.jumpStartY, this.y);
          this.state = 'falling';
        }
        break;
    }
  }

  setStateIdle() {
    this.state = 'idle';
    this.portalZoom = 0;
    this.dx = 0;
    this.dy = 0;
  }

  portalOut(destX: number = this.x, destY: number = this.y) {

    if (Date.now() - this.lastPortalUse >= 5000) {
      this.hide();
      this.goToCell(destX, destY);
      this.lastPortalUse = Date.now();
      const startPromise  = this.audioService.play('portal-gun');
      return startPromise.then((result) => {
        this.state = 'portal';
        this.x -= Rick.SIZE / 4;
        this.portalX = this.x;
        result.endPromise.then(() => {
          this.setStateIdle();
        })
      });
    } else {
      return Promise.reject('Recharging!');
    }
  }

  private renderIdle(ctx: CanvasRenderingContext2D) {
    const SIZE = Rick.SIZE;
    const x = this.x;
    const y = this.y;
    ctx.fillStyle = '#a3cfea'; // hair
    ctx.fillRect(x + SIZE / 8, y, SIZE / 1.5, SIZE / 2);
    ctx.fillStyle = '#d3c7b8'; // skin (head/face)
    ctx.fillRect(x + SIZE / 8, y + SIZE / 2, SIZE / 1.5, SIZE / 2);
    ctx.fillStyle = '#ffffff'; // skin (head/face)
    ctx.fillRect(x, this.y + SIZE, SIZE, SIZE);
    ctx.fillStyle = '#79643a'; // pants
    ctx.fillRect(x + SIZE / 8, y + SIZE * 2, SIZE / 2, SIZE);
    ctx.fillStyle = '#3a3a3a'; // boots
    ctx.fillRect(x + SIZE / 8, y + SIZE * 3,   SIZE / 2 + SIZE / 4, SIZE / 4);
  }

  private renderPortal(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#0f0';
    //ctx.fillRect(this.portalX - Rick.SIZE / 8, this.y - Rick.SIZE / 4, Rick.SIZE * 2, this.portalZoom / 2);
    ctx.beginPath();
    ctx.ellipse(this.portalX, this.y + Rick.SIZE * 2, Rick.SIZE * this.portalZoom, Rick.SIZE / 2,  90 * Math.PI/180, 0, 2 * Math.PI);
    ctx.fill();
  }

  hide() {
    this.state = 'hidden';
  }

  goToCell(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  private renderFalling(ctx: CanvasRenderingContext2D) {
    this.renderIdle(ctx);
    ctx.fillStyle = ['#fff', '#bbb', '#ccc', '#eee'][~~(Math.random()*4)];
    const COUNT = ~~(Math.random() * 10);
    for (let i = 0; i < COUNT; i++) {
      ctx.fillRect(this.x + ~~(Math.random() * i), this.y + ~~(Math.random() * i), 1, 1);
    }
  }

  setStateFalling() {
    this.state = 'falling';
    this.dy = 5;
  }

  multiply(numberA: number, numberB: number) {
    return numberA*numberB;
  }

  jump() {
    this.state = 'jumping';
    this.jumpDy = this.dy;
    this.jumpStartY = this.y;
    this.dy = -32;
  }
}
