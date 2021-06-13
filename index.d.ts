import { Router, IOptions, Request } from "urout";
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