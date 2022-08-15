import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import { TrendingCoins } from "../../config/api";
import AliceCarousel from "react-alice-carousel";

const useStyles = makeStyles({
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
  carouselItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white",
  },
});

export function numberWithCommas(x) {
  return x.toString().replace(/\8(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = ({ currency, symbol }) => {
  const classes = useStyles();
  const [trending, setTrending] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));

    setTrending(data);
  };
  console.log(trending);
  useEffect(() => {
    fetchTrendingCoins();
  }, [currency, fetchTrendingCoins]);

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };
  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;

    return (
      <a href={`/coins/${coin.id}`} className={classes.carouselItem}>
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? "rgba(14, 203, 129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol}
          {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </a>
    );
  });

  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
    </div>
  );
};

export default Carousel;
