import { PassThrough } from 'stream';
export declare class JobsXlsxExporter {
    export(jobs: any[]): Promise<PassThrough>;
}
