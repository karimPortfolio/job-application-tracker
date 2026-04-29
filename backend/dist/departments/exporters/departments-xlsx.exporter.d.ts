import { PassThrough } from 'stream';
export declare class DepartmentsXlsxExporter {
    export(departments: any[]): Promise<PassThrough>;
}
