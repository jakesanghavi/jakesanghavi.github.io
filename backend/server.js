import express from "express";
import cors from "cors";
import yahooFinance from "yahoo-finance2";
import { ORIGIN } from '../constants.js';

const app = express();
app.use(cors({
    origin: ORIGIN,
    optionsSuccessStatus: 200
}))

const PORT = process.env.PORT || 4000;


// Endpoint to fetch historical stock data
app.get("/api/stocks/:ticker", async (req, res) => {
  const { ticker } = req.params;
  const { start, end } = req.query;

  try {
    const data = await yahooFinance.chart(ticker, {
      period1: new Date(start),
      period2: new Date(new Date(end).setDate(new Date(end).getDate() + 1)),
    });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch stock data" });
  }
});

app.listen(PORT, () => console.log("Stock backend running!"));
