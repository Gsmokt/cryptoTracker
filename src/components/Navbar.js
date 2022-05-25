import React, { useState, useContext } from 'react';
import styles from '../styles/Navbar.module.css';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, provider, db } from '../firebase-config';
import { signInWithPopup, signOut } from 'firebase/auth';
import { AppContext } from '../store/Store';
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
    
    const context = useContext(AppContext);

    const [user] = useAuthState(auth);

    const signIn = () => {
        signInWithPopup(auth, provider)
            .then(() => {
                localStorage.setItem('isLogged', true);
                context.setIsLogged(true);
            })
    }

    const userSignOut = () => {
        signOut(auth)
            .then(() => {
                localStorage.clear();
                context.setIsLogged(false);
        })
    }

    const navigate = useNavigate();

    return (
        <div>
            <div className={styles.navbar} >
                <h1>Crypto tracker</h1>
                <div className={styles.login} >
                    <button onClick={() => navigate('/')} ><h1>Home</h1></button>
                    { !context.isLogged ? <button onClick={signIn} ><h1>Login</h1></button> :  <FaUserCircle className={styles.icon} cursor='pointer' size={50} />}
                </div>
            </div>
        </div>
    );
};

export default Navbar;

{/* <button onClick={userSignOut} ><h1>Logout</h1></button>  */}