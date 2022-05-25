import React from 'react';
import { FaBitcoin } from 'react-icons/fa';
import styles from '../styles/Search.module.css';

const Search = () => {
    return (
        <div className={styles.wrapper} >
            <FaBitcoin size={110} />
            <input type='text' placeholder='Search...' />
        </div>
    );
};

export default Search;