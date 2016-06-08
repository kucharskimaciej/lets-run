const koa = require('koa');
const logger = require('koa-logger');
const serve = require('koa-static');
const send = require('koa-send');
const route = require('koa-route');
const body = require('koa-body');


const REDIS_OPTIONS = {
    url: '//localhost:6379'
};
const redisClient = require('redis').createClient(REDIS_OPTIONS);
const redis = require('./lib/redisCommands')(redisClient);

const session = require('koa-generic-session');
const redisSession = require('koa-redis')(REDIS_OPTIONS);
const uuid = require('node-uuid').v4;

const {join} = require('path');
const { validateUser, validateDeleteParams } = require('./lib/validation');

const app = koa();

// PARSING
app.use(body({
    strict: false // parse DELETE request body
}));
app.use(function* (next) {
    if (typeof this.request.body === 'string') {
        try {
            this.request.body = JSON.parse(this.request.body);
        } catch (e) {}
    }
    yield next;
});

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

// API
app.use(route.post('/api/participants', function* () {

    const { name } = this.request.body;
    const token = uuid();

    const error = validateUser(this.request.body);

    if (error) {
        this.status = 400;
        this.body = 'Invalid';
        return;
    }

    const userExists = yield redis.getUserByName(name);
    if (userExists) {
        this.status = 400;
        this.body = 'Duplicate';
        return;
    }

    yield redis.createUser(this.request.body, token);

    this.session.token = token;
    this.status = 204;
}));

app.use(route.get('/api/participants', function* () {
    const result = yield redis.getAllUsers(['name', 'id']);
    this.status = 200;
    this.body = JSON.stringify(result);
}));

app.use(route.delete('/api/participants/:id/:token?', function* (id, token) {
    const user = yield redis.getUserById(id);

    if (!user) {
        this.status = 404;
        return;
    }

    if (token) {
        if (user.token !== token) {
            this.status = 403;
        } else {
            yield redis.removeUser(user);
            this.status = 200;
        }

        return;
    }


    // JSON converts to numbers
    if(this.request.body.pass) {
        this.request.body.pass = String(this.request.body.pass);
    }
    const error = validateDeleteParams(this.request.body);

    if (error) {
        this.status = 400;
        this.body = 'Invalid';
        return;
    }
    const { pass } = this.request.body;

    if (pass) {
        if (user.pass !== String(pass)) {
            this.status = 403;
        } else {
            yield redis.removeUser(user);
            this.status = 200;
        }

        return;
    }

    if (this.session.token !== user.token) {
        this.status = 403;
        return;
    }

    yield redis.removeUser(user);

    this.status = 200;
}));

// APPLICATION ROUTES
app.use(route.get('/*', function* () {
    yield send(this, 'index.html', { root: __dirname + '/views' });
}));

app.listen(3000);