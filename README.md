# koa-views-handlebars

Handlebars template engine middleware for `koa@2` based on `koa-views`.

## Installation

```sh
npm install koa-views-handlebars --save
```

## Templating engines

`koa-views-handlebars` is using [koa-views](https://github.com/queckezz/koa-views) under the hood, but provide easy way to config helpers and partails of [handlebars](https://github.com/wycats/handlebars.js).


**NOTE**: you must install the `koa-views` and `handlebars` before use this middleware, add them to your package.json dependencies.
```sh
npm install koa-views handlebars --save
```

## Example

```js
const hbs = require('koa-views-handlebars');

// setup middleware before router
app.use(hbs(__dirname , {
    helperDirs: __dirname + '/helpers',
    partialDirs: __dirname + '/views'
}));

app.use(async function (ctx) {
  await ctx.render('index', {
    title: 'Index Page'
  });
});
```

For more examples you can take a look at the [tests](./test/core.spec.js).


## API

#### `hbs(rootPath, options)`

* `rootPath`: Where your views are located. Must be an absolute path. All rendered views are relative to this path
* `options` (optional)

Very simple example.
```js
app.use(hbs(__dirname))
```



* `options.extension`: handelbars template file extension, default is `hbs`.

In this example, each file ending with `.html` will get rendered using the `handlebars` templating engine.
```js
app.use(hbs(__dirname, { extension: 'html' }))
```


* `options.helperDirs`: where your handlebars helpers are located, can be string (one dir) or array (multiple dirs).

```js
// helpers in one dir
app.use(hbs(__dirname , {
    helperDirs: __dirname + '/helpers'
}));

// helpers in multiple dirs
app.use(hbs(__dirname , {
    helperDirs:[ __dirname + '/helpers1',  __dirname + '/helpers2']
}));

```


* `options.partialDirs`: where your handlebars partials are located, can be string (one dir) or array (multiple dirs).

```js
// partials in one dir
app.use(hbs(__dirname , {
    partialDirs: __dirname + '/views'
}));

// partials in multiple dirs (related path)
app.use(hbs(__dirname , {
    partialDirs:[ './views/layout',  './views/includes',  './views/pages']
}));

```

* `options.debug`: set to true will print final options passed to koa-views 

```js
app.use(hbs(__dirname , {
    debug: true
}));

```

## License

[MIT](./LICENSE)
