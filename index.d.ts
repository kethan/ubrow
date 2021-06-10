import { Router, Opts, Request, Response } from "urout";
interface ClientOpts extends Opts {
    base?: string;
}
declare class UBrow extends Router {
    private client;
    constructor(opts: ClientOpts);
    listen(callback?: (req: Request, res: Response) => {}): void;
    private on(event: string, callback: (location: Location, req: Request, stateType: string) => {}): this;
    navigate(url: string): void;
}
export declare function Client({ onError, onNoMatch, base }?: ClientOpts): UBrow;
export { };