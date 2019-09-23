import { RHistory } from "./history";

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
    finished: boolean,
    end(chunk: any, cb?: Function);
}
type Callback = (req: Request, res: Response) => void;

export class Listener {
    private history: RHistory = new RHistory();
    private base: string = null;
    private rgx: RegExp;
    private req: Request = null;
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

    on(event: string, callback: Callback) {
        this.history.on(event, callback);
    }

    setCallback = (callback: Callback) => {
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

    listen(callback: Callback) {
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

        this.history.on('change', (location, state, source) => {
            this.setCallback(callback);
        });
    }
}
