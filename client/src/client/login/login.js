import React, { useState, useEffect } from 'react';
import {signinApi, isLoggedin} from '../authentication/authenticationApi';
// import auth from '../authentication/auth';
import AuthForm from '../authentication/authForm';
import { Redirect, useLocation } from 'react-router-dom';

const Login = () => {
    const [redirectTorefferer, setRedirectToRefferer] = useState(false);
    const [redirectToSignUp, setRedirectToSignup] = useState(false);
    const {state} = useLocation();

    useEffect(() => {
        async function isAlreadLoggedIn() {
            const toRedirectToRefferer = await isLoggedin();
            setRedirectToRefferer(toRedirectToRefferer);
        }

        isAlreadLoggedIn();
    }, [])
    
    // const handleSubmit = async (data) => {
    //     try {
    //         await signinApi(data);
    //         auth.authenticte();
    //         setRedirectToRefferer(true);

    //     } catch (err) {
    //         setRedirectToRefferer(false);
    //     }
    // }

    if(redirectToSignUp) {
        return <Redirect to={'/signup'}/>
    }


    if(redirectTorefferer) {
        return <Redirect to={state?.from || '/'}/>
    }

    return (
        <div>
            <AuthForm
                title={'Welcome back'}
                showUserName={false}
                submitFunction={signinApi}
                submitButtonText={'login'}
                swipAuthFormFunc = {() => setRedirectToSignup(true)}
                swipAuthFormText = {'new one? join here'}
                toValidate = {false}
            />

            {/* <div onClick={() => setRedirectToSignup(true)}> new one? join here </div> */}
        </div>
    );
}

export default Login;