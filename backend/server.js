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

app.get("/api/stocks/:ticker/financials", async (req, res) => {
  const { ticker } = req.params;

  try {
    // Fetch full quote summary
    const summary = await yahooFinance.quoteSummary(ticker, { modules: ['assetProfile', 'summaryProfile', 'financialData', 'defaultKeyStatistics', 'earnings'] });

    const { assetProfile, summaryProfile, financialData, defaultKeyStatistics, earnings } = summary;

    const cleanFinancials = {
      fullTimeEmployees: summaryProfile?.fullTimeEmployees || assetProfile?.fullTimeEmployees || null,
      marketCap: defaultKeyStatistics?.enterpriseValue ? +((defaultKeyStatistics.enterpriseValue / 1).toFixed(2)) : null,
      forwardPE: defaultKeyStatistics?.forwardPE ? +defaultKeyStatistics.forwardPE.toFixed(2) : null,
      profitMargins: financialData?.profitMargins ? +financialData.profitMargins.toFixed(2) : null,
      sharesOutstanding: defaultKeyStatistics?.sharesOutstanding ? +defaultKeyStatistics.sharesOutstanding.toFixed(2) : null,
      priceToBook: defaultKeyStatistics?.priceToBook ? +defaultKeyStatistics.priceToBook.toFixed(2) : null,
      currentPrice: financialData?.currentPrice ? +financialData.currentPrice.toFixed(2) : null,
      targetHighPrice: financialData?.targetHighPrice ? +financialData.targetHighPrice.toFixed(2) : null,
      targetLowPrice: financialData?.targetLowPrice ? +financialData.targetLowPrice.toFixed(2) : null,
      targetMedianPrice: financialData?.targetMedianPrice
        ? +financialData.targetMedianPrice.toFixed(2)
        : financialData?.targetMeanPrice
          ? +financialData.targetMeanPrice.toFixed(2)
          : null,
      recommendationKey: financialData?.recommendationKey || null,
      debtToEquity: financialData?.debtToEquity ? +financialData.debtToEquity.toFixed(2) : null,
      enterpriseToEbitda: defaultKeyStatistics?.enterpriseToEbitda ? +defaultKeyStatistics.enterpriseToEbitda.toFixed(2) : null,
      earnings: earnings?.earningsChart?.quarterly?.map(q => ({
        date: q.date,
        actual: q.actual ? +q.actual.toFixed(2) : null,
        estimate: q.estimate ? +q.estimate.toFixed(2) : null,
        surprisePct: q.actual && q.estimate ? +(((q.actual - q.estimate) / q.estimate) * 100).toFixed(2) : null
      })) || [],
      financialsChart: earnings?.financialsChart || {}
    };

    res.json(cleanFinancials);

  } catch (err) {
    console.error(`Failed to fetch ${ticker} financials:`, err);
    res.status(500).json({ error: "Failed to fetch financials" });
  }
});

app.listen(PORT, () => console.log("Stock backend running!"));