export class Emitter {
    private all;
    constructor(all?) {
        this.all = all || Object.create(null);
    }
    on(type: string, handler) {
        (this.all[type] || (this.all[type] = [])).push(handler);
    }
    off(type: string, handler) {
        if (this.all[type]) {
            this.all[type].splice(this.all[type].indexOf(handler) >>> 0, 1);
        }
    }
    emit(type: string, ...evt): void {
        (this.all[type] || []).slice().map((handler) => { handler(...evt); });
        (this.all['*'] || []).slice().map((handler) => { handler(type, ...evt); });
    }
}