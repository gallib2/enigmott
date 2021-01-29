import config from '../config';

const validationObject = {
    isError: false,
    errorMsg: '',
}

function emailValidate(email) {
    const emailValidRes = Object.assign({}, validationObject);
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValid = emailRegex.test(String(email).toLowerCase());

    if (!isValid) {

        emailValidRes.isError = true;
        emailValidRes.errorMsg = config.texts.errors.emailError;
    }

    return emailValidRes;
}

function passwordValidate(password) {
    const passwordValidRes = Object.assign({}, validationObject);
    const passwordRegex = /^(?=.*?[\p{Lu}])(?=.*?[\p{Ll}])(?=.*?\d).*.{8,50}$/u;
    const isValid = passwordRegex.test(String(password));

    if (!isValid) {
        passwordValidRes.isError = true;
        passwordValidRes.errorMsg = config.texts.errors.passwordError;
    }

    return passwordValidRes;
}

function usernameValidate(username) {
    const usernameValidRes = Object.assign({}, validationObject);
    const usernameRegex = /^[a-zA-Z ]{3,30}$/;
    const isValid = usernameRegex.test(String(username).toLowerCase());

    if (!isValid) {
        usernameValidRes.isError = true;
        usernameValidRes.errorMsg = config.texts.errors.usernameError;
    }

    return usernameValidRes;
}

function validations(field, value) {
    const fieldsValidations = {
        email: emailValidate,
        password: passwordValidate,
        username: usernameValidate
    }


    const result = fieldsValidations[field](value);
    return result;
}



export default validations;