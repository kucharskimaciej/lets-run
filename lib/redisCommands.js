const pick = require('lodash/pick');

const USER_SEQUENCE_KEY = 'sequence:user';
const NAME_KEY = 'name';

module.exports = client => {
    const redis = require('co-redis')(client);
    return {
        *getUserById(id) {
            return redis.hgetall(`us:${id}`);
        },

        *getUserByName(name) {
            const key = nameKey(name);
            return redis.get(key);
        },

        *getAllUsers(includeKeys) {
            const keys = yield redis.keys('us:*');
            const cmd = keys.reduce(($, key) => {
                return $.hgetall(key);
            }, redis.multi());

            const result = yield cmd.exec();

            return result.map(u => pick(u, ...includeKeys));
        },

        *nextId() {
            return redis.incr(USER_SEQUENCE_KEY);
        },

        *createUser({ name, email, pass }, token, id = null) {
            if (!id) {
                id = yield this.nextId();
            }

            const user = {
                name, token, id
            };

            if (pass) {
                user.pass = pass;
            }

            if (email) {
                user.email = email;
            }

            const cmd = redis.multi()
                .set(`${nameKey(name)}`, id)
                .hmset(`us:${id}`, user);

            return cmd.exec();
        },

        *removeUser({ id, name }) {
            const cmd = redis.multi().del(nameKey(name)).del(`us:${id}`);

            return cmd.exec();
        }
    };


    function nameKey(name) {
        return `${NAME_KEY}:${name.toLowerCase().replace(/\s*/g, '')}`;
    }
};