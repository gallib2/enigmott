const Joi = require('joi');
const {BCRYPT_MAX_BYTES} = require('../config/auth');

const email = Joi.string().email().min(8).max(254).lowercase().trim().required();
const username = Joi.string().min(3).max(254).trim().required();
const password = Joi.string().min(8).max(BCRYPT_MAX_BYTES, 'utf8')
.regex(/^(?=.*?[\p{Lu}])(?=.*?[\p{Ll}])(?=.*?\d).*$/u)
.message('{#label} must contain one upercase letter, one lowercase letter and one digit')
.required();


const registerScheme = Joi.object({
    email,
    username,
    password,
})

const loginScheme = Joi.object({
    email,
    password
})

module.exports = {
    registerScheme,
    loginScheme
};