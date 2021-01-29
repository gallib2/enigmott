import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { logout, isLoggedin } from '../authentication/authenticationApi';
import auth from '../authentication/auth';
import { getRiddlesApi } from './homePage.api';
import RiddleItem from '../riddle/riddleItem';

import './home-page.scss';

import MenuAppBar from './header';

// TODO :
// - get all riddles
// - present the riddles (currently withou sorting)
// - a click on a riddle will enter the canvas (pass the riddle question to the canvas)

const HomePage = (props) => {
    const history = useHistory();
    const [riddles, setRiddles] = useState([]);

    const handleLogout = async (e) => {
        try {
            await logout();
            auth.signout();
            history.push('/login');
        } catch (err) {

        }
    }

    useEffect(() => {
        async function getRiddles() {
            try {
                const res = await getRiddlesApi();
                setRiddles(res);
            } catch(err) {
                // history.push('/login');
                auth.signout();
                history.push('/login');
            }
        }

        getRiddles();
    }, [])

    // const sortSolvedFirst = () => {

    // }

    return (
        <div className='home-page-container'>
            <MenuAppBar
                logOut={handleLogout}
            />
            {/* <div onClick={sortSolvedFirst}>sloved</div> */}
            {/* <div className='header'></div> */}
            {/* <div>hello to home page</div> */}
            {/* <Button onClick={handleLogout}>Logout</Button> */}
            <div className='riddle-box-container'>
                <div className='riddles-boxes'>
                    {(riddles.map((riddle, index) => {
                        return <RiddleItem key={index} riddle={riddle} />
                    }))}
                </div>
            </div>
        </div>
    );
}

export default HomePage;