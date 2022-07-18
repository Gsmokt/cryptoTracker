import React, { useState, useContext, useEffect } from "react";
import styles from "../styles/Navbar.module.css";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, provider, db } from "../firebase-config";
import { signInWithPopup, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { AppContext } from "../store/Store";
import { FaUserCircle } from "react-icons/fa";
import { Drawer } from "@mui/material";

const Navbar = () => {
  const { coins, isLogged, setIsLogged, watchlist } = useContext(AppContext);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [docSnapshot, setDocSnapshot] = useState();

  const [user] = useAuthState(auth);

  const navigate = useNavigate();

  const signIn = () => {
    signInWithPopup(auth, provider).then(() => {
      localStorage.setItem("isLogged", true);
      setIsLogged(true);
    });
  };

  const userSignOutAndClose = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsLogged(false);
      setIsDrawerOpen(false);
    });
  };

  const getCoin = async () => {
    const docSnap = await getDoc(doc(db, "watchlist", user?.uid));
    if (docSnap?.exists()) {
      setDocSnapshot(docSnap?.data().coins);
    }
  };

  useEffect(() => {
    getCoin();
    // eslint-disable-next-line
  }, [watchlist, user?.uid]);

  return (
    <div>
      <div className={styles.navbar}>
        <h1>Crypto tracker</h1>
        <div className={styles.login}>
          <button onClick={() => navigate("/")}>
            <h1>Home</h1>
          </button>
          {!isLogged ? (
            <button onClick={signIn}>
              <h1>Login</h1>
            </button>
          ) : (
            <FaUserCircle
              onClick={() => setIsDrawerOpen(true)}
              className={styles.icon}
              size={50}
            />
          )}
          <Drawer
            PaperProps={{
              sx: { backgroundColor: "#26272b", color: "#DCDCDC" },
            }}
            anchor="right"
            open={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
          >
            <div className={styles.drawer}>
              <div className={styles.list1}>
                <FaUserCircle size={70} />
                <p>Watchlist</p>
              </div>
              <div className={styles.list2}>
                {coins?.map((e) => {
                  if (docSnapshot?.includes(e.id)) {
                    return (
                      <div
                        className={styles.navSection}
                        key={e.id}
                        onClick={() => {
                          navigate(`/coin/${e.id}`);
                          setIsDrawerOpen(false);
                        }}
                      >
                        <img
                          className={styles.navIcons}
                          src={e.image}
                          alt="Not found"
                        />
                        <div className={styles.navCoins}>{e.name}</div>
                      </div>
                    );
                  } else return "";
                })}
              </div>

              <div className={styles.list3}>
                <button onClick={userSignOutAndClose}>Logout</button>
                <button onClick={() => setIsDrawerOpen(false)}>Close</button>
              </div>
            </div>
          </Drawer>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
