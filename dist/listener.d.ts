export interface Request {
    method: string;
    url: string;
    search?: string;
    query?: string;
    pathname?: string;
    path?: string;
}
export interface Response {
    statusCode: number;
    finished: boolean;
    end(chunk: any, cb?: Function): any;
}
declare type Callback = (req: Request, res: Response) => void;
export declare class Listener {
    private history;
    private base;
    private rgx;
    private req;
    private res;
    constructor(base?: string);
    navigate(url: string): void;
    on(event: string, callback: Callback): void;
    setCallback: (callback: Callback) => void;
    listen(callback: Callback): void;
}
export {};
