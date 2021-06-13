import { Client } from "../src";

let users = Client()
    .get('/:id', (req, res) => {
        console.log('users!', req.params.id);
    })

let app = Client({
    onError: (err, req, res) => {
        res.end(err);
    }, onNoMatch: (req, res, next) => {
        res.end("no match");
    }
});

app
    .use((req, res, next) => {
        console.log('Root middleware');
        next()
    })
    .use('users', users)
    .get('/', (req, res) => {
        console.log('root');
    })
    .get('/error', (req, res) => {
        throw 'e';
    })
    .get('/about', (req, res) => {
        console.log('about', req.query);
    })
    .listen();

setTimeout(() => {
    app.navigate('/error')
}, 1000);

setTimeout(() => {
    app.unListen();
    console.log('unlisten!');
}, 5000);