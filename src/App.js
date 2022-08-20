import React, { useState, useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Coins from "./components/Coins";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import CoinDetails from "./components/CoinDetails";
import { AppContext } from "./store/Store";

function App() {
  const { setCoins } = useContext(AppContext);

  const [value, setValue] = useState("");

  const getCoints = async () => {
    const { data } = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=30&page=1&sparkline=false"
    );
    setCoins(data);
  };

  useEffect(() => {
    getCoints();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Search setValue={setValue} />
              <Coins setValue={setValue} value={value} />
            </>
          }
        />
        <Route path="/coin/:id" element={<CoinDetails />} />
      </Routes>
    </>
  );
}

export default App;
