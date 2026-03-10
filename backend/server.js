import express from "express";
import cors from "cors";
import YahooFinance from "yahoo-finance2";
import { ORIGIN } from "../constants.js";

const app = express();
const yahooFinance = new YahooFinance();

app.use(cors({
  origin: ORIGIN,
  optionsSuccessStatus: 200
}));

const PORT = process.env.PORT || 4000;

app.get("/api/stocks/:ticker", async (req, res) => {
  const { ticker } = req.params;
  const { start, end } = req.query;

  try {
    const result = await yahooFinance.chart(ticker, {
      period1: start,
      period2: end,
      interval: "1d"
    });

    res.json({
      quotes: result.quotes
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch stock data" });
  }
});

app.listen(PORT, () => console.log("Stock backend running!"));