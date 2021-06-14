import { Router, IOptions } from "urout";
import { Listener } from "./listener";
interface ClientOpts extends IOptions {
    base?: string;
}
class UBrow extends Router {
    private client: Listener;
    onError;
    onNoMatch;
    constructor(private opts: ClientOpts) {
        super(opts);
        this.onError = opts.onError;
        this.onNoMatch = opts.onNoMatch;
        this.client = new Listener(this.opts.base);
    }

    listen({ onError = this.onError, onNoMatch = this.onNoMatch } = {}) {
        this.onError = onError;
        this.onNoMatch = onNoMatch;
        this.client.listen(this.handler);
    }

    unListen() {
        this.client.unListen();
    }

    on(event: string, callback) {
        this.client.on(event, callback)
        return this;
    }

    navigate(url: string) {
        this.client.navigate(url);
    }
}

export function Client({
    onError = (err, req, res) => {
        console.error(err)
    }, onNoMatch = (req, res, next) => {
        console.error('no match');
    },
    base = '/'
}: ClientOpts = {}) {
    return new UBrow({ onError, onNoMatch, base });
}