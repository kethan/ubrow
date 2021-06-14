import { Client } from "../src";

let errorListener = {
    onError: (err, req, res) => console.log('listen err', err),
    onNoMatch: (req, res, next) => console.log('nomatch')
};

let users = Client(errorListener)
    .get('/:id', (req, res) => {
        console.log('users!', req.params.id);
    })

let app = Client()
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
        res.redirect('/'); // Redirect to root again
    })
    .listen(errorListener);

setTimeout(() => {
    // app.navigate('/error')
}, 1000);

setTimeout(() => {
    // app.unListen();
    console.log('unlisten!');
}, 5000);