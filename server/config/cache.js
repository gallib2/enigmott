// const {
//     REDIS_PORT = 6379,
//     REDIS_HOST = 'localhost',
//     REDIS_PASSWORD = 'secret'

// } = process.env

const REDIS_OPTIONS = {
    port: process.env.REDIS_PORT || 6379,
    host: process.env.REDIS_HOST || 'localhost',
    password: process.env.REDIS_PASSWORD || 'secret'
}

module.exports = REDIS_OPTIONS;