import React, { useState, useContext, useEffect } from 'react';
import styles from '../styles/Navbar.module.css';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, provider, db } from '../firebase-config';
import { signInWithPopup, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { AppContext } from '../store/Store';
import { FaUserCircle } from "react-icons/fa";
import { Drawer, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';


const Navbar = () => {

    const context = useContext(AppContext);

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const [showUp, setShowUp] = useState(false);

    const [docSnapshot, setDocSnapshot] = useState();

    const [user] = useAuthState(auth);

    const navigate = useNavigate();

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

    const userSignOutAndClose = () => {
        signOut(auth)
        .then(() => {
            localStorage.clear();
            context.setIsLogged(false);
            setIsDrawerOpen(false);
        })
    }

    
    useEffect(() => {
      const getCoin = async () => {
      

        const docSnap = await getDoc(doc(db, 'watchlist', user?.uid));
        setDocSnapshot(docSnap.data().coins);
      }
      getCoin();
    })

    return (
        <div>
            <div className={styles.navbar} >
                <h1>Crypto tracker</h1>
                <div className={styles.login} >
                    <button onClick={() => navigate('/')} ><h1>Home</h1></button>
                    { !context.isLogged 
                        ? <button onClick={signIn} ><h1>Login</h1></button> 
                        : <FaUserCircle onClick={() => setIsDrawerOpen(true)} className={styles.icon} size={50} /> }
                    <Drawer PaperProps={{ sx: { backgroundColor: '#26272b', color: "#DCDCDC" } }} 
                    anchor='right' open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
                        <div className={styles.drawer} >
                            <div className={styles.list1} ><FaUserCircle size={70} /><p>Watchlist</p></div>
                            {docSnapshot?.map(e => <button onClick={() => {navigate(`/coin/${e}`); setIsDrawerOpen(false)}} key={e}>{e}</button>)}
                            <div className={styles.list3} >
                                <button onClick={userSignOutAndClose} >Logout</button>
                                <button onClick={() => setIsDrawerOpen(false)} >Close</button>
                            </div>
                        </div>
                    </Drawer>
                </div>
            </div>
        </div>
    );
};

export default Navbar;

{/* <button onClick={userSignOut} ><h1>Logout</h1></button>  */}