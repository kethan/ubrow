import { Emitter } from "./emitter";
export declare class RHistory extends Emitter {
    win: Window;
    addEvent: any;
    h: History;
    ctx: Window;
    constructor();
    pushState(state: any, title: string, url: string): void;
    replaceState(state: any, title: string, url: string): void;
}
