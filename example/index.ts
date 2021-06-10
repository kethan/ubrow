import { Client } from "../src";

let users = Client()
    .get('/', (req, res) => {
        console.log('users!');
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
        console.log('mid');
        next()
    })
    .use('users', users)
    .get('/', (req, res) => {
        console.log('root');
    })
    .get('/one', (req, res) => {
        throw 'e';
        console.log('one');
    })
    .get('/about', (req, res) => {
        console.log('about');
    })
    .listen();

setTimeout(() => {
    app.navigate('/one');
}, 5000);