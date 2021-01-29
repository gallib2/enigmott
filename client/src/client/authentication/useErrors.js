
import React, {useState} from 'react';
import validations from './validations';

const fields = ['email', 'password', 'username']

const useErrors = () => {
    const [emailHelperText, setEmailHelperText] = useState('');
    const [emailIsError, seStEmailIsError] = useState(false);

    const [passwordHelperText, setPasswordHelperText] = useState('');
    const [passwordIsError, setPasswordIsError] = useState(false);

    const [usernameHelperText, setUsernameHelperText] = useState('');
    const [usernameIsError, setUsernameIsError] = useState(false);

    const setterErrorMsgRefrence = (field) => {
        const refs = {
            email: setEmailHelperText,
            password: setPasswordHelperText,
            username: setUsernameHelperText
        }

        return refs[field];
    }

    const setterIsErrorRefrence = (field) => {
        const refs = {
            email: seStEmailIsError,
            password: setPasswordIsError,
            username: setUsernameIsError
        }

        return refs[field];
    }

    const setErrors = ({ setError, errorMsg, field }) => {
        const funcSetErrorMsg = setterErrorMsgRefrence(field);
        const funcSetErrorState = setterIsErrorRefrence(field);
        funcSetErrorMsg(errorMsg);
        funcSetErrorState(setError);
    }

    const isAllFieldsAreValid = (values) => {
        for(const field of fields) {
            const res = validations(field, values[field]);
            if(res.isError) {
                return false;
            }
        }

        return true;
    }

    const validateField = (field, value) => {
        const validation = validations(field, value);
        setErrors({setError: validation.isError, errorMsg: validation.errorMsg, field})
    }

    const fieldsError = {
        emailHelperText,
        emailIsError,
        passwordHelperText,
        passwordIsError,
        usernameHelperText,
        usernameIsError,
    }

    return {
        fieldsError,
        setErrors,
        validateField,
        isAllFieldsAreValid
    }
}

export default useErrors;