export enum CellType {
  Air, Ground, Water, Fire, Uranium
}

export class Cell {

  constructor(type: CellType = CellType.Air, x: number, y: number) {
    this.type = type;
    this.x = x;
    this.y = y;
  }

  static CELL_WIDTH = 72;
  static CELL_HEIGHT = 72;
  private static COLORS: string[] = [
    '#66edff', // Air
    '#000',    // Ground
    '#00f',    // Water
    '#f00',    // Fire
    '#0f0'     // Uranium
  ];
  type: CellType;
  x: number;
  y: number;

  render(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = Cell.COLORS[this.type];
    ctx.fillRect(
      this.x * Cell.CELL_WIDTH,
      this.y * Cell.CELL_HEIGHT,
      Cell.CELL_WIDTH,
      Cell.CELL_HEIGHT
    );
  }

  logic(dtt: number): void {

  }
}
