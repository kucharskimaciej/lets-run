const koa = require('koa');
const logger = require('koa-logger');
const serve = require('koa-static');
const send = require('koa-send');
const route = require('koa-route');

const session = require('koa-generic-session');
const redisSession = require('koa-redis')({
    url: '//localhost:6379'
});
const uuid = require('node-uuid').v4;

const {join} = require('path');

const app = koa();

// ASSETS
app.use(serve(join(__dirname, 'public')));

// SESSION
const YEAR_IN_MS = 31536000000;
app.keys = ['devkey'];
app.use(session({
    store: redisSession,
    cookie: {
        maxAge: YEAR_IN_MS
    }
}));


// APPLICATION ROUTES
app.use(route.get('/*', function* () {
    if (!this.session.token) {
        this.session.token = uuid();
    }

    yield send(this, 'index.html', { root: __dirname + '/views' });
}));

app.listen(3000);