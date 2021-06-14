# UBrow

**Start broswer apps in seconds** ✨

Fast, unopinionated, minimalist client router

A client router based on [`urout`](https://github.com/kethan/urout)

# Features

-   **Lightweight** - 2.5kb min+gzip
-   **No Dependency** - No Bloating. No external dependencies
-   **Express.js identical API** - Nearly identical application API & route pattern definitions

# Install

```
$ npm install --save ubrow
or
https://unpkg.com/ubrow
```

# Usage

index.html

```html
<base href="/" />
<ul>
	<li><a href="./">/home</a></li>
	<li><a href="./about?q=10">/about</a></li>
	<li><a href="./error">/one</a></li>
	<li><a href="./users/someone">/users</a></li>
	<li><a href="./nomatch">/not found</a></li>
</ul>
<script src="https://unpkg.com/ubrow"></script>
<script>
	let errorListener = {
		onError: (err, req, res) => console.log("err", err),
		onNoMatch: (req, res, next) => console.log("nomatch"),
	};

	let users = ubrow.Client(errorListener).get("/:id", (req, res) => {
		console.log("users!", req.params.id);
	});

	let app = Client()
		.use((req, res, next) => {
			console.log("Root middleware");
			next();
		})
		.use("users", users)
		.get("/", (req, res) => {
			console.log("root");
		})
		.get("/error", (req, res) => {
			throw "e";
		})
		.get("/about", (req, res) => {
			console.log("about", req.query);
			res.redirect("/"); // Redirect to root again
		})
		.listen(errorListener);

	setTimeout(() => {
		app.navigate('/error')
	}, 1000);

	setTimeout(() => {
		app.unListen();
		console.log("unlisten!");
	}, 5000);
</script>
```

# API

# License

MIT © Kethan Surana
