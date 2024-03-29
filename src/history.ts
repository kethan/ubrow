import { Emitter } from "./emitter";
export class RHistory extends Emitter {
    win: any;
    addEvent;
    h: History;
    ctx: Window;
    listen =  (e) => {
        this.emit('popstate', e)
        this.emit('change', this.ctx.location, this.h.state, 'popstate')
    };
    constructor() {
        super();
        this.win = typeof window == 'object' && window;
        this.ctx = this.win;
        this.h = this.ctx.history;
        if (!this.h) { throw new Error('History API is not available') };
        if (!this.ctx.location) { throw new Error('Location API is not available') };
        this.addEvent = this.ctx.addEventListener;

        if (this.addEvent) {
            this.ctx.addEventListener('popstate', this.listen);
        }
    }

    pushState(state: any, title: string, url: string) {
        this.emit('pushState', state, title, url);
        this.h.pushState(state, title, url);
        this.emit('change', this.ctx.location, state, 'pushState');
    }

    replaceState(state: any, title: string, url: string) {
        this.emit('replaceState', state, title, url);
        this.h.replaceState(state, title, url);
        this.emit('change', this.ctx.location, state, 'replaceState');
    }

    unListen() {
        this.ctx.removeEventListener('popstate', this.listen);
    }
}