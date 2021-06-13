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
    .get('/one', (req, res) => {
        throw 'e';
    })
    .get('/about', (req, res) => {
        console.log('about', req.query);
    })
    .on('change', (a ,b ,c) => {
        console.log(a,b,c);
        
    })
    .listen();

setTimeout(() => {
    app.navigate('/one');
}, 5000);