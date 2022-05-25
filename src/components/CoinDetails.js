import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from '../styles/CoinsDetails.module.css';
import DOMPurify from 'dompurify';
import Chart from './Chart';


const CoinDetails = () => {

    const params = useParams();

    const [coin, setCoin] = useState({});
    const [history, setHistory] = useState([]);

    const getHistory = async () => {
        try{
            const res = await fetch(`https://api.coingecko.com/api/v3/coins/${params.id}/market_chart?vs_currency=eur&days=14&interval=daily`);
            const data = await res.json();
            setHistory([...data.prices]);
            console.log(history)
            }catch(err){
            console.log(err);
            }
    }

    const getCoin = async () => {
        try{
        const { data }  = await axios.get(`https://api.coingecko.com/api/v3/coins/${params.id}`);
        
        setCoin(data);

        console.log(history)
        }catch(err){
        console.log(err);
        }
    }
    
      useEffect(() => {
        getCoin();
        getHistory();
      }, [])

    return (
        <div className={styles.wrapper} >
            <div className={styles.coinDetails} >
                <br />
                {coin.image ? <img src={coin.image.large} alt='Not found' /> : null}
                <h2>{coin?.name}</h2>
                <br />
                <p dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(coin.description ? coin.description.en.split(".")[0] : '')
                        }}>
                </p>
                <br />
                <div className={styles.stats} >
                    <h2>Rank: </h2>
                    <h2>{coin.market_cap_rank}</h2>
                </div> 
                <br />
                <div className={styles.stats} >
                    <h2>7 days change: </h2>
                    {coin.market_data ? <h2>{coin.market_data.price_change_percentage_7d.toFixed(2)} %</h2> : null}
                </div>
                <br />
                <div className={styles.stats} >
                    <h2>30 days change: </h2>
                    {coin.market_data ? <h2>{coin.market_data.price_change_percentage_30d.toFixed(2)} %</h2> : null}
                </div>
                <button className={styles.btn} >Add to watchlist</button>
            </div>
            <div className={styles.chart} >
                    <Chart history={history} />
            </div>
        </div>
    );
};

export default CoinDetails;