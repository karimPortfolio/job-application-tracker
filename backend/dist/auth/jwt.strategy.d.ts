import type { Cache } from 'cache-manager';
import type { Request } from 'express';
declare const JwtStrategy_base: new (...args: any) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private cache;
    constructor(cache: Cache);
    validate(req: Request, payload: any): Promise<any>;
}
export {};
