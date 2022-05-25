import React from 'react';
import Coin from './Coin';
import styles from '../styles/Coins.module.css';

const Coins = ({ coins }) => {
    return (
        <div className={styles.container} >
            <div className={styles.heading} >
                <p className={styles.coinname}>Coin</p>
                <p className={styles.list} >Price</p>
                <p className={styles.list} >24h change</p>
                <p className={styles.list} >Total volume</p>
                <p className={styles.list} >Market Cap</p>
            </div>
            {coins?.map(coin => <Coin key={coin.id} id={coin.id} marketcap={coin.market_cap.toLocaleString()} image={coin.image} symbol={coin.symbol} name={coin.name} price={coin.current_price.toLocaleString()} change={coin.price_change_percentage_24h.toFixed(2)}  volume={coin.total_volume.toLocaleString()} rank={coin.market_cap_rank} />)}
        </div>
    );
};

export default Coins;