import { Router, Opts } from "urout";
interface ClientOpts extends Opts {
    base?: string;
}
declare class UBrow extends Router {
    private client;
    constructor(opts: ClientOpts);
    listen(): void;
    on(event: string, callback: any): this;
    navigate(url: string): void;
}
export declare function Client({ onError, onNoMatch, base }?: ClientOpts): UBrow;
export {};
