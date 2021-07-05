import {Rick} from "./rick";
import {Cell, CellType} from "./cell";
import {of} from "rxjs";

// Необходимо придумать соглашение о наименовании координат. Например:
// Абсолютные, относительные, координаты ячейки - это все лучше не путать
// Пусть координаты ячейки (cell) это будут не "x" и "y", а "c" и "r" (column, row)
// Просто x и y пусть всегда означают абсолютные координаты (от левого верхнего угла Вселенной)
// "ox" "oy" пусть обозначают относительные координаты (от левого верхнего угла канвы)
// "cx" "cy" пусть будут координатами центра (в остальных случаях левый верхний угол)


// @todo: move it to Cell.ts, make export
const CELL_TYPES = [
  CellType.Air,
  CellType.Air,
  CellType.Air,
  CellType.Ground,
  CellType.Ground,
  CellType.Fire,
  CellType.Uranium
];

export class Universe {
  private width: number;
  private height: number;
  private rick: Rick;
  constructor(initialWidth: number, initialHeight: number, rick: Rick = null) {
    this.width = initialWidth;
    this.height = initialHeight;
    this.rick = rick;



    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        const cell = this.initCell(x, y);
        this.cells.push(cell);
      }
    }

    const firstAirCell = this.cells.find(cell => cell.type == CellType.Air);
    if (this.rick && firstAirCell) {
      this.rick.goToCell(firstAirCell.x, firstAirCell.y);
    }
  }

  protected initCell(x: number, y: number): Cell {
        // const type = CELL_TYPES[~~(Math.random() * CELL_TYPES.length)]
        const type = Math.random() > 0.5 ? CellType.Air : CellType.Ground;
      return new Cell(type, x , y );
  }

  public render(ctx: CanvasRenderingContext2D) {
    this.cells.forEach(cell => cell.render(ctx));
    this.rick && this.rick.render(ctx);
  }

  public logic(dtt: number) {
    this.cells.forEach(cell => cell.logic(dtt));
    this.rick && this.rick.logic(dtt);
    try {
      const rickCell = this.getCell(this.rick.x, this.rick.y);
      if (!rickCell) throw new Error('rickCell is null!!!');
      const bottomCell = this.getCell(this.rick.x, this.rick.y + 1);
      if (!bottomCell) {
        throw  new Error('Bottom cell is null!!!');
      }
      if (bottomCell.type === CellType.Air) {
        this.rick.setStateFalling();
      } else {
        this.rick.setStateIdle();
      }


      if (rickCell.type !== CellType.Air) {
        const mn = this.mn(rickCell.x, rickCell.y);
        const nearestAirCell = mn.find(cell => {          
          return cell.type === CellType.Air;
        });
        if(nearestAirCell) {
          this.rick.goToCell(nearestAirCell.x, nearestAirCell.y);
        } else {
          // ???
          console.log('it is not AIR!!!');

        }
      }
    } catch (e) {
      //console.error(e);
    }
    //@todo: code below should not throw exxeptions!
  }

  cells: Cell[] = [];

  getCell(x: number, y: number): Cell {
    return this.cells.find(cell => x === cell.x  && y === cell.y);
  }

  mn(x: number, y: number):Cell[]{
    const mn = [
      {x: -1, y: -1},
      {x:  0, y: -1},
      {x:  1, y: -1},
      {x: -1, y:  0},
      {x:  1, y:  0},
      {x: -1, y:  1},
      {x:  0, y:  1},
      {x:  1, y:  1},
    ];
    return mn.map((offset) => {
      const ox = offset.x + x;
      const oy = offset.y + y;
      return this.getCell(ox, oy);
    });
  }
}
