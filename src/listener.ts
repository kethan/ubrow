import { Request, Response } from "urout";
import { RHistory } from "./history";
export class Listener {

    private history: RHistory = new RHistory();
    private base: string = '';
    private rgx: RegExp;
    private req: Request | undefined;
    private res: Response = {
        statusCode: 200,
        finished: false,
        end: (chunk: any, cb: Function) => {
            if (chunk) {
                console.error(chunk);
            }
        }
    }
    constructor(base?: string) {
        this.base = '/' + (base || '').replace(/^\/|\/$/g, '');
        this.rgx = this.base == '/' ? /^\/+/ : new RegExp('^\\' + this.base + '(?=\\/|$)\\/?', 'i');
    }

    navigate(url: string) {
        this.req = {
            method: 'GET',
            url: url
        };
        this.history.pushState(this.req, '', url)
    }

    on(event: string, callback) {
        this.history.on(event, callback);
    }

    private setCallback = (callback) => {
        let path = location && location.pathname + location.search || '/';
        if (this.base != '/') {
            path = path.replace(this.base, '');
        }
        this.req = {
            method: 'GET',
            url: path
        }
        callback(this.req, this.res);
    }

    listen(callback) {
        this.setCallback(callback);
        addEventListener('click', (e: any) => {
            var x = e.target.closest('a'), y = x && x.getAttribute('href');
            if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || e.button || e.defaultPrevented) return;
            if (!y || x.target || x.host !== location.host) return;
            if (y[0] != '/' || this.rgx.test(y)) {
                e.preventDefault();
                this.history.pushState(this.req, '', y)
            }
        });

        this.history.on('change', (location: any, state: any, source: any) => {
            this.setCallback(callback);
        });
    }
}
