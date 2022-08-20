import { Matrix } from './matrix';

describe('Matrix', () => {
  it('should init with code', () => {
    const code = 'The code of the Matrix translated to human language. (part)';
    const matrix = new Matrix(code);
    expect(matrix.getSourceCode()).toEqual(code);
    // 59 columns (code.length) * 8 rows = 472
    expect(matrix.cells.length).toEqual(472);
  });
  it('should make code waterfall effect', () => {

  });
});
