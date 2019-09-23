export declare class Emitter {
    private all;
    constructor(all?: any);
    on(type: string, handler: any): void;
    off(type: string, handler: any): void;
    emit(type: string, ...evt: any[]): void;
}
