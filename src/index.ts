import { Router, Opts } from "urout";
import { Listener } from "./listener";
interface ClientOpts extends Opts {
    base?: string;
}
class UBrow extends Router {
    private client: Listener;
    constructor(opts: ClientOpts) {
        super(opts);
        this.client = new Listener(opts.base);
    }

    listen() {
        this.client.listen(this.handler);
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