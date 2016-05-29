const koa = require('koa');
const logger = require('koa-logger');
const serve = require('koa-static');
const send = require('koa-send');
const route = require('koa-route');

const {join} = require('path');

const app = koa();

app.use(serve(join(__dirname, 'public')));
app.use(route.get('/*', function* () {
    yield send(this, 'index.html', { root: __dirname + '/views' });
}));

app.listen(3000);