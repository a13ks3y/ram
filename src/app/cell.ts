export enum CellType {
  Air, Ground, Water, Fire, Uranium
}

export class Cell {
    type: CellType;
    static CELL_WIDTH = 72;
    static CELL_HEIGHT = 72;
    private static COLORS: string[] = [
        '#50ddff', // Air
        '#f90',    // Ground
        '#00f',    // Water
        '#f00',    // Fire
        '#0f0'     // Uranium
    ];
    x: number;
    y: number;

    constructor(type: CellType = CellType.Air, x: number, y: number) {
        this.type = type;
        this.x = x;
        this.y = y;
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = Cell.COLORS[this.type];
        ctx.fillRect(this.x * Cell.CELL_WIDTH, this.y * Cell.CELL_HEIGHT, Cell.CELL_WIDTH, Cell.CELL_HEIGHT);
    }

  logic(dtt: number) {

  }
}
