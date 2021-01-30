export default {
    api_route: window.location.hostname.includes('localhost') ? 'http://localhost:4000' : 'https://enigmot.herokuapp.com',  //|| 'http://localhost:4000',
    texts: {
        errors: {
            generalError: 'error accured, please try again later',
            generalFieldsError: 'make sure all fields are valid',
            emailError: 'email is not valid',
            passwordError: 'password is not valid - password must contain min 8 letters, one upercase letter, one lowercase letter and one digit',
            usernameError: 'username is not valid',
            savePaintError: 'Error occurred while trying to save image, please try again later',
            markSolvedError: 'Error occurred while trying to mark as sloved, please try again later'
        }
    }
}