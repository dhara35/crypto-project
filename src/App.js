import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import "./App.css";
import Homepage from "./pages/Homepage";
import Coinpage from "./pages/Coinpage";
import { makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";

const useStyles = makeStyles({
  App: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  },
});

function App() {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("");

  useEffect(() => {
    if (currency === "INR") setSymbol("Rs.");
    else if (currency === "USD") setSymbol("$");
    // else setSymbol("$");
  }, [currency]);

  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header currency={currency} symbol={symbol} setCurrency={setCurrency} />
        <Routes>
          <Route
            path="/"
            exact
            element={<Homepage currency={currency} symbol={symbol} />}
          />
          <Route
            path="/coins/:id"
            element={<Coinpage currency={currency} symbol={symbol} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
