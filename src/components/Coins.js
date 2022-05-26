import React, { useContext } from 'react';
import Coin from './Coin';
import styles from '../styles/Coins.module.css';
import { AppContext } from '../store/Store';

const Coins = ({ value, setValue }) => {

    const { coins } = useContext(AppContext);

    const searchCoin = coins.filter(coin => coin.name.toLowerCase().includes(value.toLowerCase()));

    return (
        <div className={styles.container} >
            <div className={styles.heading} >
                <p className={styles.coinname}>Coin</p>
                <p className={styles.list} >Price</p>
                <p className={styles.list} >24h change</p>
                <p className={styles.list} >Total volume</p>
                <p className={styles.list} >Market Cap</p>
            </div>
            {searchCoin?.map(coin => <Coin key={coin.id} coins={coins} setValue={setValue} id={coin.id} marketcap={coin.market_cap.toLocaleString()} image={coin.image} symbol={coin.symbol} name={coin.name} price={coin.current_price.toLocaleString()} change={coin.price_change_percentage_24h.toFixed(2)}  volume={coin.total_volume.toLocaleString()} rank={coin.market_cap_rank} />)}
        </div>
    );
};

export default Coins;