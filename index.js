const koa = require('koa');
const logger = require('koa-logger');
const serve = require('koa-static');
const send = require('koa-send');
const route = require('koa-route');
const body = require('koa-body');
const pick = require('lodash/pick');

const REDIS_OPTIONS = {
    url: '//localhost:6379'
};
const redisClient = require('redis').createClient(REDIS_OPTIONS);
const redis = require('co-redis')(redisClient);

const session = require('koa-generic-session');
const redisSession = require('koa-redis')(REDIS_OPTIONS);
const uuid = require('node-uuid').v4;

const {join} = require('path');

const app = koa();

// ASSETS
app.use(body());
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

const USER_SEQUENCE_KEY = 'sequence:user';
app.use(route.post('/api/participants', function* () {

    const { name } = this.request.body;
    const nameKey = `name:${name.toLowerCase().replace(/\s*/g, '')}`;
    const token = uuid();

    const userExists = yield redis.get(nameKey);
    if (userExists) {
        this.status = 400;
        return;
    }

    const id = yield redis.incr(USER_SEQUENCE_KEY);
    const createUserCommand = redis.multi()
        .set(`${nameKey}`, id)
        .hmset(`us:${id}`, {
            name, token, id
        });
    yield createUserCommand.exec();

    this.session.token = token;

    this.status = 200;

}));
app.use(route.get('/api/participants', function* () {

    const keys = yield redis.keys('us:*');
    const getAllUsersCommand = keys.reduce(($, key) => {
        return $.hgetall(key);
    }, redis.multi());

    let result = yield getAllUsersCommand.exec();

    result = result.map(u => pick(u, 'id', 'name'));
    this.status = 200;
    this.body = JSON.stringify(result);
}));

app.use(route.delete('/api/participants/:id', function* (id) {
    const user = yield redis.hgetall(`us:${id}`);

    if (!user) {
        this.status = 404;
        return;
    }

    if (this.session.token !== user.token) {
        this.status = 403;
        return;
    }

    const nameKey = `name:${user.name.toLowerCase().replace(/\s*/g, '')}`;
    const getRemoveUserCommand = redis.multi().del(nameKey).del(`us:${id}`);

    yield getRemoveUserCommand.exec();

    this.status = 200;
}));

// APPLICATION ROUTES
app.use(route.get('/*', function* () {
    yield send(this, 'index.html', { root: __dirname + '/views' });
}));

app.listen(3000);