import React, { useState, useEffect } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { signupApi, isLoggedin } from '../authentication/authenticationApi';

import AuthForm from '../authentication/authForm';

import './signup.scss';

// TODO - login after so redirect to homepage
// very similar to login.js... do something

const Signup = () => {
    const [redirectTorefferer, setRedirectToRefferer] = useState(false);
    const [redirectToLogin, setRedirectToLogin] = useState(false);
    const {state} = useLocation();

    useEffect(() => {
        async function isAlreadLoggedIn() {
            const toRedirectToRefferer = await isLoggedin();
            setRedirectToRefferer(toRedirectToRefferer);
        }

        isAlreadLoggedIn();
    }, [])

    if (redirectToLogin) {
        return <Redirect to={'/login'} />
    }

    if(redirectTorefferer) {
        return <Redirect to={state?.from || '/'}/>
    }

    return (
        <div>
            <AuthForm
                title={'Sign Up'}
                showUserName={true}
                submitFunction={signupApi}
                submitButtonText={'Submit'}
                swipAuthFormFunc = {() => setRedirectToLogin(true)}
                swipAuthFormText = {'already joined? login'}
                toValidate = {true}
            />

            {/* <div onClick={() => setRedirectToLogin(true)}> already joined? login </div> */}
        </div>
    );
}

export default Signup;