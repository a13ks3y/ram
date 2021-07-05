import { Universe } from './universe';
import { Rick } from './rick';
const MIN_ROWS_COUNT = 6;
export class Matrix extends Universe {

    static prepareTheCode(code: string) {
        let rows = code.split('\n');
        let fixedCode = '';
        if (rows.length < MIN_ROWS_COUNT) {
            for (let i = 0; i < MIN_ROWS_COUNT - rows.length; i++) {
                const c = ~~(code.length / 6) > 1 ? ~~(code.length / 6) : 2;
                const index = i * c > code.length ? undefined : i * 16;
                fixedCode += code.substr(0, index) + '\n';
                fixedCode += code.substr(index) + '\n';
            }           
            rows = fixedCode.split('\n').filter(c => c.length > 0);            
        }
        const sortedRows = rows.slice().sort((a,b)=>{ return b.length - a.length });
        const longestRow = sortedRows.length ? sortedRows[0] : rows[0];
        return {
            rows: rows.length,
            cols: longestRow.length
        };
    }
    private readonly sourceCode: string;
    constructor(code: string, rick?: Rick) {
        const theCode = Matrix.prepareTheCode(code);
        super(theCode.rows, theCode.cols, rick);
        this.sourceCode = code;
    }
    getSourceCode(): string {
        return this.sourceCode.substr(0);
    }
}
