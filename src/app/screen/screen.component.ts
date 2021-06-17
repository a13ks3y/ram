import {Component, OnInit} from '@angular/core';
import {Universe} from "../universe";
import {Rick} from "../rick";
import {AudioService} from "../audio.service";
import {Cell, CellType} from "../cell";

@Component({
  selector: 'ram-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.less']
})
export class ScreenComponent implements OnInit {
  private ctx: CanvasRenderingContext2D;
  private editMode: boolean = true;
  private universe: Universe;
  private rick: Rick;
  private lastTick: number;

  constructor(private audioService: AudioService) { }

  ngOnInit(): void {
    this.rick = new Rick(this.audioService);
    this.rick.hide();
    this.universe = new Universe(32, 8, this.rick);

    const canvas = document.getElementById('ctx') as HTMLCanvasElement;
    this.ctx = canvas.getContext('2d');
    canvas.addEventListener('click', this.click.bind(this));
    document.body.addEventListener('keydown', this.keydown.bind(this));
    document.body.addEventListener('keyup', this.keyup.bind(this));
    this.lastTick = Date.now();
    this.render();
    setTimeout(() => {
      this.rick.portalOut().then(() => {
        console.log('portal Outed!');
      });
    }, 333);
  }

  private click(e: MouseEvent) {
    const mx = e.offsetX;
    const my = e.offsetY;
    const x = ~~(mx / Cell.CELL_WIDTH);
    const y = ~~(my / Cell.CELL_HEIGHT);
    const cell = this.universe.getCell(x, y);
    if (cell && cell.type === CellType.Air) {
      this.rick.portalOut(cell.x, cell.y).catch(() => {
        console.log('todo show that portal gun is locked, it can shoot only each N seconds');
      });
    }

  }
  private keydown(e: KeyboardEvent) {
    switch (e.key) {
      case 'ArrowRight': this.rick.dx = 2.7; break;
      case 'ArrowLeft': this.rick.dx = -2.7; break;
    }
  }
  private keyup(e: KeyboardEvent) {
    switch (e.key) {
      case 'ArrowLeft': case 'ArrowRight': this.rick.dx = 0; break;
      case 'ArrowUp': this.rick.jump(); break;
    }
  }

  private render() {
    const dt = Date.now() - this.lastTick;
    const dtt = dt / 1000 * 60;
    const ctx = this.ctx;
    ctx.fillStyle = '#000';
    ctx.fillRect(0,0, ctx.canvas.width, ctx.canvas.height);
    this.universe.logic(dtt);
    this.universe.render(ctx);
    this.lastTick = Date.now();
    requestAnimationFrame(this.render.bind(this));
  }

}
