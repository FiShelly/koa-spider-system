# koa-blog-system
 This is a web spider system which use koa.js, mysql, js, html, css, angular7 to code it.

# the system directories
```
.
├── app
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   │   ├── page
│   │   └── web
│   ├── services
│   └── utils
├── bin
├── build
├── config
├── front-end
│   └── splider
│       ├── e2e
│       └── src
├── logs
├── public
│   ├── download
│   ├── error
│   └── spider
└── test
```

# how to use
before you use, you should copy database.config.example.js,server.config.exmaple.js in config dir.
```sh
$ cd confg
$ copy database.config.example.js database.config.js
$ copy server.config.example.js server.config.js
```
And then, according to your actual situation, you can modify these 2 config file.
- PS.  The config file is relatively simple, so I don't want to explain detail.
```sh
$ vim  config.file.
```

At last, you should do install lib, and run it.
```sh
```sh
$ npm install
// if your environment is dev, you should use:
// the first command is webpack build in dev, and the second is run serve.
$ npm run dev && npm run serve
// if your environment is production, you should make sure you had installed pm2.
// if your not installed pm2, you can use this command to installed it.
$ npm install -g pm2
// you shoud build it before you use pm2;
$ npm run build
// and then use this command to deploy system.
$ npm run start:prod
```

# how to build

```sh
$ cd front-end/spider
// dev environment
$ npm run build:dev
// prod environment
$ npm run build:prod

// all command you can see package.json
```

# Other
My blog is this address, wlecome you can visit it.
- [Fishelly Idx. (https://blog.fishelly.top)](https://blog.fishelly.top)

# The last.
 If you have any question, you can submit issuse for me.

# License

[MIT](LICENSE)
