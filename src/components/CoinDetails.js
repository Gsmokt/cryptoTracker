import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styles from "../styles/CoinsDetails.module.css";
import DOMPurify from "dompurify";
import Chart from "./Chart";
import { AppContext } from "../store/Store";
import { auth, db } from "../firebase-config";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";

const CoinDetails = () => {
  const [close, setClose] = useState(false);

  const [open, setOpen] = useState(false);

  const [user] = useAuthState(auth);

  const context = useContext(AppContext);

  const params = useParams();

  const [coin, setCoin] = useState({});

  const [history, setHistory] = useState([]);

  const getHistory = async () => {
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${params.id}/market_chart?vs_currency=eur&days=14&interval=daily`
      );
      const data = await res.json();
      setHistory([...data.prices]);
    } catch (err) {
      console.log(err);
    }
  };

  const getCoin = async () => {
    try {
      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${params.id}`
      );
      setCoin(data);
    } catch (err) {
      console.log(err);
    }
  };

  const addToWatchList = async () => {
    try {
      await setDoc(doc(db, "watchlist", user?.uid), {
        coins: context.watchlist
          ? [...context.watchlist, coin?.id]
          : [coin?.id],
      });
    } catch (error) {
      console.log(error);
    }
    context.setWatchlist([...context.watchlist, coin.id]);
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  };

  const removeFromWatchList = async () => {
    const ref = doc(db, "watchlist", user?.uid);
    try {
      await setDoc(ref, {
        coins: context.watchlist.filter((e) => e !== coin.id),
      });
    } catch (error) {
      console.log(error);
    }
    setClose(true);
    setTimeout(() => {
      setClose(false);
    }, 2000);
  };

  useEffect(() => {
    getCoin();
    getHistory();

    if (user) {
      var unsubscribe = onSnapshot(doc(db, "watchlist", user?.uid), (coin) => {
        if (coin.exists()) {
          context.setWatchlist(coin.data().coins);
        }
      });
      return () => {
        unsubscribe();
      };
    }
    // eslint-disable-next-line
  }, [params.id]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.coinDetails}>
        <br />
        {coin.image ? <img src={coin.image.large} alt="Not found" /> : null}
        <h2>{coin?.name}</h2>
        <br />
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
              coin.description ? coin.description.en.split(".")[0] : ""
            ),
          }}
        ></p>
        <br />
        <div className={styles.stats}>
          <h2>Rank: </h2>
          <h2>{coin.market_cap_rank}</h2>
        </div>
        <br />
        <div className={styles.stats}>
          <h2>7 days change: </h2>
          {coin.market_data ? (
            <h2>{coin.market_data.price_change_percentage_7d.toFixed(2)} %</h2>
          ) : null}
        </div>
        <br />
        <div className={styles.stats}>
          <h2>30 days change: </h2>
          {coin.market_data ? (
            <h2>{coin.market_data.price_change_percentage_30d.toFixed(2)} %</h2>
          ) : null}
        </div>
        {context.isLogged &&
          (context.watchlist.includes(coin.id) ? (
            <button onClick={removeFromWatchList} className={styles.btn}>
              Remove from watchlist
            </button>
          ) : (
            <button onClick={addToWatchList} className={styles.btn}>
              Add to watchlist
            </button>
          ))}
        <Collapse in={close}>
          <Alert
            severity="error"
            variant="outlined"
            sx={{ color: "#DCDCDC", mb: 2, mt: 2, ml: 1 }}
          >
            Removed from watchlist !
          </Alert>
        </Collapse>
        <Collapse in={open}>
          <Alert
            severity="success"
            variant="outlined"
            sx={{ color: "#DCDCDC", mb: 2, mt: 2, ml: 1 }}
          >
            Successfully added !
          </Alert>
        </Collapse>
      </div>
      <div className={styles.chart}>
        <Chart history={history} />
      </div>
    </div>
  );
};

export default CoinDetails;
