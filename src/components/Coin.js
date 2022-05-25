import React from 'react';
import styles from '../styles/Coin.module.css';
import { useNavigate } from "react-router-dom";

const Coin = ({ id, image, volume, price, symbol, name, change, marketcap }) => {

    const navigate = useNavigate();

    return (
        <div onClick={() => navigate(`/coin/${id}`)} className={styles.wrapper} >
            <div className={styles.logo} >
            <img src={image} />
                <div>
                    <p>{name}</p>
                    <p>{symbol}</p>
                </div>
                
            </div>
            <div className={styles.list} >
                <p>€ {price}</p>
            </div>
            <div className={styles.list} >
                  {change < 0 ? <p className={styles.red} >{change} %</p> : <p className={styles.green} >{change} %</p> }
            </div>
            <div className={styles.list} >
                <p>€ {volume}</p>
            </div>
            <div className={styles.list} >
                <p>€ {marketcap}</p>
            </div>
        </div>
    );
};

export default Coin;