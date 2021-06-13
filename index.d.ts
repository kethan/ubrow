import { Router, IOptions, Request, Response, Middleware, ErrorHandler, NextHandler, ParsedURL, IError, Pattern, Promisable } from "urout";
interface ClientOpts extends IOptions {
    base?: string;
}
declare class UBrow extends Router {
    private client;
    constructor(opts: ClientOpts);
    listen(): void;
    private on(event: string, callback: (location: Location, req: Request, stateType: string) => {}): this;
    navigate(url: string): void;
}

export declare function Client({ onError, onNoMatch, base }?: ClientOpts): UBrow;

export { Request, Response, Middleware, ErrorHandler, NextHandler, ParsedURL, IError, Pattern, Promisable }