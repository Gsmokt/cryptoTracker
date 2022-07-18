import React from "react";
import { FaBitcoin } from "react-icons/fa";
import styles from "../styles/Search.module.css";

const Search = ({ setValue }) => {
  return (
    <div className={styles.wrapper}>
      <FaBitcoin size={110} />
      <input
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder="Search..."
      />
    </div>
  );
};

export default Search;
