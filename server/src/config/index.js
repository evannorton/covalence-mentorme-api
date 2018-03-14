let env = process.env;

if (!env.DB_HOST) {
    env = require('./config').default;
}

export default env;
