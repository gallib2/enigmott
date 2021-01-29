const {
    NODE_ENV = 'development'
} = process.env

const IN_PROD = NODE_ENV === 'production';

module.exports = IN_PROD