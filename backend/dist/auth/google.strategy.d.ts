import { ConfigService } from '@nestjs/config';
import { Profile, Strategy } from 'passport-google-oauth20';
import type { VerifyCallback } from 'passport-google-oauth20';
export type GoogleProfilePayload = {
    googleId: string;
    email: string;
    name: string;
};
declare const GoogleStrategy_base: new (...args: [options: import("passport-google-oauth20").StrategyOptionsWithRequest] | [options: import("passport-google-oauth20").StrategyOptions] | [options: import("passport-google-oauth20").StrategyOptions] | [options: import("passport-google-oauth20").StrategyOptionsWithRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class GoogleStrategy extends GoogleStrategy_base {
    private readonly configService;
    constructor(configService: ConfigService);
    validate(_accessToken: string, _refreshToken: string, profile: Profile, done: VerifyCallback): void;
}
export {};
