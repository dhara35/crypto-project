import React from "react";
import Banner from "../components/banner/Banner";
import CoinsTable from "../components/CoinsTable";

const Homepage = ({ currency, symbol }) => {
  return (
    <>
      <Banner currency={currency} symbol={symbol} />
      <CoinsTable currency={currency} symbol={symbol} />
    </>
  );
};

export default Homepage;
