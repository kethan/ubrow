# UBrow

**Start broswer apps in seconds** ✨

Fast, unopinionated, minimalist client router;)

A client router based on [```urout```](https://github.com/kethan/urout)

# Features

* **Lightweight** - 2.5kb min+gzip
* **No Dependency** - No Bloating. No external dependencies
* **Express.js identical API** - Nearly identical application API & route pattern definitions

# Install
```
$ npm install --save ubrow
or
https://unpkg.com/ubrow
```
# Usage

index.html
```html
<base href="/">
<ul>
    <li><a href="./">/home</a></li>
    <li><a href="./about?q=10">/about</a></li>
    <li><a href="./one">/one</a></li>
    <li><a href="./users/">/users</a></li>
    <li><a href="./nomatch">/not found</a></li>
</ul>
<script src="https://unpkg.com/ubrow"></script>
<script>
let users = ubrow.Client()
    .get('/', (req, res) => {
        console.log('users!');
    })

let app = ubrow.Client({
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
    .on('change', (location, req, stateType) => {
         console.log(location, req, stateType);
    })
    .listen();

setTimeout(() => {
    app.navigate('/one');
}, 5000);
</script>
```
# API

# License

MIT © Kethan Surana