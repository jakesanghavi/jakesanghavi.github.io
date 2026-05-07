import { useState, useEffect } from "react";
import { DatePicker } from "antd";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import M2 from "dayjs";
import { ROUTE } from '../../constants';
import { motion } from "framer-motion";
import PieTooltip from "../components/PieToolTip";

// Predefined stock info
const rawData = [
  ["SELL", "Zeta", "ZETA", "2026-05-06", 17.27, 0.0215, '#6535ab', "https://api.iconify.design/token:zeta-chain.svg?color=%236535AB", "Checking"],
  ["BUY", "Micron", "MU", "2026-05-04", 577.17, 0.001, '#9e03cc', "https://companieslogo.com/img/orig/MU.D-7d8b6366.png?t=1740419775", "Checking"],
  ["SELL", "RobinHood", "HOOD", "2026-05-04", 77.38, 0.0125, '#ceff1a', "https://api.iconify.design/simple-icons:robinhood.svg?color=%23CEFF1A", "Checking"],
  ["BUY", "Microsoft", "MSFT", "2026-04-29", 423.62, 0.001, '#1ba7f0', "https://api.iconify.design/simple-icons:microsoft.svg?color=%231BA7F0", "Checking"],
  ["BUY", "Meta", "META", "2026-04-29", 670.86, 0.0005, '#1685fe', "https://api.iconify.design/simple-icons:meta.svg?color=%231685FE", "Checking"],
  ["BUY", "Micron", "MU", "2026-04-29", 520.43, 0.0012, '#9e03cc', "https://companieslogo.com/img/orig/MU.D-7d8b6366.png?t=1740419775", "Checking"],
  ["SELL", "Adobe", "ADBE", "2026-04-27", 243.58, 0.0022, '#ec1f11', "https://api.iconify.design/simple-icons:adobe.svg?color=%23EC1F11", "Checking"],
  ["BUY", "United Healthcare", "UNH", "2026-04-20", 323.31, 0.001, '#08287e', "https://1000logos.net/wp-content/uploads/2018/02/unitedhealthcare-emblem.png", "Checking"],
  ["BUY", "Meta", "META", "2026-04-17", 683.53, 0.001, '#1685fe', "https://api.iconify.design/simple-icons:meta.svg?color=%231685FE", "Checking"],
  ["BUY", "Microsoft", "MSFT", "2026-04-13", 393.63, 0.0018, '#1ba7f0', "https://api.iconify.design/simple-icons:microsoft.svg?color=%231BA7F0", "Checking"],
  ["BUY", "Microsoft", "MSFT", "2026-04-13", 393.53, 0.002, '#1ba7f0', "https://api.iconify.design/simple-icons:microsoft.svg?color=%231BA7F0", "Roth IRA"],
  ["BUY", "Adobe", "ADBE", "2026-03-12", 269.78, 0.0002, '#ec1f11', "https://api.iconify.design/simple-icons:adobe.svg?color=%23EC1F11", "Checking"],
  ["BUY", "Iren", "IREN", "2026-03-12", 40.45, 0.005, '#70da7e', "https://iren.com/icons/logo.svg?dpl=947", "Checking"],
  ["SELL", "Fiserv", "FISV", "2026-03-09", 60.92, 0.003, '#ff6600', "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Fiserv_logo.svg/1280px-Fiserv_logo.svg.png", "Checking"],
  ["BUY", "RobinHood", "HOOD", "2026-03-06", 77.88, 0.0125, '#ceff1a', "https://api.iconify.design/simple-icons:robinhood.svg?color=%23CEFF1A", "Checking"],
  ["BUY", "Vertiv", "VRT", "2026-03-06", 248.61, 0.0015, '#1c1c1c', "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Vertiv_logo.svg/250px-Vertiv_logo.svg.png", "Checking"],
  ["BUY", "Microsoft", "MSFT", "2026-01-30", 430.06, 0.0012, '#1ba7f0', "https://api.iconify.design/simple-icons:microsoft.svg?color=%231BA7F0", "Checking"],
  ["BUY", "Nvidia", "NVDA", "2026-01-16", 187.12, 0.004, '#7dba17', "https://api.iconify.design/simple-icons:nvidia.svg?color=%237DBA17", "Checking"],
  ["BUY", "Zeta", "ZETA", "2026-01-07", 23.39, 0.0215, '#6535ab', "https://api.iconify.design/token:zeta-chain.svg?color=%236535AB", "Checking"],
  ["BUY", "Meta", "META", "2025-11-05", 638.75, 0.0005, '#1685fe', "https://api.iconify.design/simple-icons:meta.svg?color=%231685FE", "Checking"],
  ["BUY", "Meta", "META", "2025-10-31", 648.39, 0.0003, '#1685fe', "https://api.iconify.design/simple-icons:meta.svg?color=%231685FE", "Checking"],
  ["BUY", "Amazon", "AMZN", "2025-10-23", 221.07, 0.0035, '#ff9c1b', "https://api.iconify.design/simple-icons:amazon.svg?color=%23FF9C1B", "Checking"],
  ["BUY", "Adobe", "ADBE", "2025-09-12", 348.04, 0.002, '#ec1f11', "https://api.iconify.design/simple-icons:adobe.svg?color=%23EC1F11", "Checking"],
  ["SELL", "Palantir", "PLTR", "2025-08-29", 156.93, 0.0033, '#000000', "https://api.iconify.design/simple-icons:palantir.svg?color=%23000000", "Checking"],
  ["BUY", "ASML", "ASML", "2025-07-11", 801.06, 0.0006, '#0f248c', "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0ibQsZPMfxRsF3gl0CV6fK48yi6MXfOSR9g&s", "Checking"],
  ["BUY", "Fiserv", "FISV", "2025-07-09", 171.52, 0.003, '#ff6600', "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Fiserv_logo.svg/1280px-Fiserv_logo.svg.png", "Checking"],
  ["BUY", "Google", "GOOGL", "2025-07-09", 176.65, 0.003, '#fabf1d', "https://api.iconify.design/simple-icons:google.svg?color=%23FABF1D", "Checking"],
  ["BUY", "Google", "GOOGL", "2025-05-08", 153.97, 0.006, '#fabf1d', "https://api.iconify.design/simple-icons:google.svg?color=%23FABF1D", "Checking"],
  ["SELL", "Palantir", "PLTR", "2025-05-05", 124.42, 0.002, '#000000', "https://api.iconify.design/simple-icons:palantir.svg?color=%23000000", "Checking"],
  ["SELL", "Apple", "AAPL", "2025-05-01", 213.25, 0.001, '#080808', "https://api.iconify.design/simple-icons:apple.svg?color=%23080808", "Checking"],
  ["BUY", "Meta", "META", "2025-04-25", 547.91, 0.0012, '#1685fe', "https://api.iconify.design/simple-icons:meta.svg?color=%231685FE", "Roth IRA"],
  ["BUY", "SPY", "SPY", "2025-04-09", 529.59, 0.003, '#4e9942', "https://1000logos.net/wp-content/uploads/2023/04/State-Street-Global-Advisers-Logo.jpg", "Checking"],
  ["SELL", "Nvidia", "NVDA", "2025-04-08", 102.94, 0.015, '#7dba17', "https://api.iconify.design/simple-icons:nvidia.svg?color=%237DBA17", "Checking"],
  ["SELL", "Palantir", "PLTR", "2025-04-03", 84.94, 0.0095117, '#000000', "https://api.iconify.design/simple-icons:palantir.svg?color=%23000000", "Checking"],
  ["BUY", "Nvidia", "NVDA", "2025-01-29", 121.25, 0.005, '#7dba17', "https://api.iconify.design/simple-icons:nvidia.svg?color=%237DBA17", "Checking"],
  ["BUY", "Palantir", "PLTR", "2024-12-13", 75, 0.002, '#000000', "https://api.iconify.design/simple-icons:palantir.svg?color=%23000000", "Checking"],
  ["SELL", "Microsoft", "MSFT", "2024-12-03", 429.94, 0.001, '#1ba7f0', "https://api.iconify.design/simple-icons:microsoft.svg?color=%231BA7F0", "Checking"],
  ["BUY", "Amazon", "AMZN", "2024-12-03", 213.34, 0.0017, '#ff9c1b', "https://api.iconify.design/simple-icons:amazon.svg?color=%23FF9C1B", "Checking"],
  ["BUY", "Palantir", "PLTR", "2024-08-28", 30.36, 0.0033, '#000000', "https://api.iconify.design/simple-icons:palantir.svg?color=%23000000", "Checking"],
  ["BUY", "Nvidia", "NVDA", "2024-08-28", 126.02, 0.004, '#7dba17', "https://api.iconify.design/simple-icons:nvidia.svg?color=%237DBA17", "Checking"],
  ["BUY", "Meta", "META", "2024-04-25", 431.69, 0.0004, '#1685fe', "https://api.iconify.design/simple-icons:meta.svg?color=%231685FE", "Checking"],
  ["BUY", "Nvidia", "NVDA", "2023-11-21", 49.973, 0.01, '#7dba17', "https://api.iconify.design/simple-icons:nvidia.svg?color=%237DBA17", "Checking"],
  ["BUY", "Microsoft", "MSFT", "2023-11-20", 375.08, 0.001, '#1ba7f0', "https://api.iconify.design/simple-icons:microsoft.svg?color=%231BA7F0", "Checking"],
  ["BUY", "Apple", "AAPL", "2023-07-14", 190.72, 0.001, '#080808', "https://api.iconify.design/simple-icons:apple.svg?color=%23080808", "Checking"],
  ["BUY", "Palantir", "PLTR", "2023-06-12", 15.77, 0.0095117, '#000000', "https://api.iconify.design/simple-icons:palantir.svg?color=%23000000", "Checking"],
  ["BUY", "SPY", "SPY", "2023-06-01", 421.65, 0.0035, '#4e9942', "https://1000logos.net/wp-content/uploads/2023/04/State-Street-Global-Advisers-Logo.jpg", "Checking"],
  ["BUY", "Nvidia", "NVDA", "2023-06-01", 39.434, 0.005, '#7dba17', "https://api.iconify.design/simple-icons:nvidia.svg?color=%237DBA17", "Checking"],
  ["BUY", "SPY", "SPY", "2022-07-07", 386.78, 0.004, '#4e9942', "https://1000logos.net/wp-content/uploads/2023/04/State-Street-Global-Advisers-Logo.jpg", "Checking"],
  ["BUY", "SPY", "SPY", "2022-01-10", 458.2, 0.0033, '#4e9942', "https://1000logos.net/wp-content/uploads/2023/04/State-Street-Global-Advisers-Logo.jpg", "Checking"],
  ["SELL", "Vertex", "VRTX", "2021-08-16", 191.81, 0.0007, '#451964', "https://api.iconify.design/simple-icons:vertex.svg?color=%23451964", "Checking"],
  ["BUY", "Vertex", "VRTX", "2021-08-02", 198.73, 0.0007, '#451964', "https://api.iconify.design/simple-icons:vertex.svg?color=%23451964", "Checking"],
  ["SELL", "United Airlines", "UAL", "2021-08-02", 46.91, 0.0036, '#0a39a3', "https://api.iconify.design/simple-icons:united-airlines.svg?color=%230A39A3", "Checking"],
  ["BUY", "United Airlines", "UAL", "2021-06-18", 54.43, 0.0036, '#0a39a3', "https://api.iconify.design/simple-icons:united-airlines.svg?color=%230A39A3", "Checking"],
  ["BUY", "SPY", "SPY", "2021-03-05", 376.7, 0.004, '#4e9942', "https://1000logos.net/wp-content/uploads/2023/04/State-Street-Global-Advisers-Logo.jpg", "Checking"]
];

// Map to structured objects
const df = rawData.map(([Action, Company, Ticker, dateStr, Price, Shares, Color, LogoUrl]) => ({
  Action,
  Company,
  Ticker,
  Date: new Date(dateStr),
  Price,
  Shares,
  Color,
  LogoUrl
}));

function xirr(cashflows, guess = 0.1) {
  const maxIter = 100;
  const tol = 1e-6;

  cashflows = [...cashflows].sort((a, b) => a.date - b.date);
  const t0 = cashflows[0].date;

  const npv = rate =>
    cashflows.reduce((sum, cf) => {
      const years = (cf.date - t0) / (1000 * 60 * 60 * 24 * 365.25);
      return sum + cf.amount / Math.pow(1 + rate, years);
    }, 0);

  const dnpv = rate =>
    cashflows.reduce((sum, cf) => {
      const years = (cf.date - t0) / (1000 * 60 * 60 * 24 * 365.25);
      return sum - (years * cf.amount) / Math.pow(1 + rate, years + 1);
    }, 0);

  let rate = guess;

  const hasPos = cashflows.some(c => c.amount > 0);
  const hasNeg = cashflows.some(c => c.amount < 0);
  if (!hasPos || !hasNeg) return 0;

  for (let i = 0; i < maxIter; i++) {
    const value = npv(rate);
    const deriv = dnpv(rate);

    if (Math.abs(deriv) < 1e-10) break;

    let newRate = rate - value / deriv;
    if (newRate < -0.9999) newRate = -0.9999;

    if (Math.abs(newRate - rate) < tol) return newRate;

    rate = newRate;
  }

  return rate;
}

/**
 * Computes portfolio XIRR using ALL cashflows (buys, sells, and terminal value of open lots).
 * Optionally filter by tickers. priceMap must contain current prices for open positions.
 */
const computePortfolioXIRR = (asOfDate, tickers, priceMap) => {
  const cashflows = [];

  const relevantTxns = df.filter(t =>
    t.Date <= asOfDate && (!tickers || tickers.includes(t.Ticker))
  );

  for (let t of relevantTxns) {
    const value = t.Price * t.Shares;
    if (t.Action === "BUY") cashflows.push({ date: t.Date, amount: -value });
    if (t.Action === "SELL") cashflows.push({ date: t.Date, amount: value });
  }

  // Terminal value: open lots at current price
  const usedTickers = tickers || [...new Set(df.map(d => d.Ticker))];
  for (let ticker of usedTickers) {
    const openLots = getOpenLots(ticker, asOfDate);
    const shares = openLots.reduce((s, l) => s + l.shares, 0);
    if (!shares || !priceMap[ticker]) continue;
    cashflows.push({ date: asOfDate, amount: shares * priceMap[ticker] });
  }

  return xirr(cashflows) * 100;
};

// Get open lots only (for pie chart, table, current holdings)
function getOpenLots(ticker, asOfDate) {
  const txns = df
    .filter(d => d.Ticker === ticker && d.Date <= asOfDate)
    .sort((a, b) => a.Date - b.Date);

  let openLots = [];

  for (let row of txns) {
    if (row.Action === "BUY") {
      openLots.push({ date: row.Date, shares: row.Shares, price: row.Price, Color: row.Color, LogoUrl: row.LogoUrl });
    } else if (row.Action === "SELL") {
      let sharesToSell = row.Shares;
      while (sharesToSell > 0 && openLots.length > 0) {
        if (openLots[0].shares <= sharesToSell) {
          sharesToSell -= openLots[0].shares;
          openLots.shift();
        } else {
          openLots[0].shares -= sharesToSell;
          sharesToSell = 0;
        }
      }
    }
  }

  return openLots;
}

// Fetch historical prices for a ticker between two dates
async function fetchTickerHistory(ticker, startDate, endDate) {
  const res = await fetch(`${ROUTE}/api/stocks/${ticker}?start=${startDate.toISOString()}&end=${endDate.toISOString()}`);
  const hist = await res.json();
  return hist.quotes || [];
}

// Calculate lifetime return & XIRR for a single ticker across all lots (open + closed)
function computeLifetimeMetrics(ticker, asOfDate, lastPrice) {
  const txns = df
    .filter(d => d.Ticker === ticker && d.Date <= asOfDate)
    .sort((a, b) => a.Date - b.Date);

  if (!txns.length) return { lifetime: 0, xirr: 0 };

  let openLots = [];
  let cashflows = [];

  for (let t of txns) {
    const value = t.Price * t.Shares;
    if (t.Action === "BUY") {
      openLots.push({ date: t.Date, shares: t.Shares, price: t.Price });
      cashflows.push({ date: t.Date, amount: -value });
    } else if (t.Action === "SELL") {
      let sharesToSell = t.Shares;
      while (sharesToSell > 0 && openLots.length > 0) {
        const lot = openLots[0];
        const sellShares = Math.min(lot.shares, sharesToSell);
        cashflows.push({ date: t.Date, amount: sellShares * t.Price });
        lot.shares -= sellShares;
        sharesToSell -= sellShares;
        if (lot.shares === 0) openLots.shift();
      }
    }
  }

  for (let lot of openLots) {
    cashflows.push({ date: asOfDate, amount: lot.shares * lastPrice });
  }

  const totalInvested = txns
    .filter(t => t.Action === "BUY")
    .reduce((sum, t) => sum + t.Price * t.Shares, 0);

  const totalReturned = cashflows
    .filter(c => c.amount > 0)
    .reduce((sum, c) => sum + c.amount, 0);

  const lifetime = ((totalReturned - totalInvested) / totalInvested) * 100;

  const hasPos = cashflows.some(c => c.amount > 0);
  const hasNeg = cashflows.some(c => c.amount < 0);
  const rate = hasPos && hasNeg ? xirr(cashflows) * 100 : 0;

  return { lifetime, xirr: rate };
}

// Component
export default function MyInvestments() {
  const [asOfDate, setAsOfDate] = useState(M2());
  const [performance, setPerformance] = useState([]);
  const [portfolioXIRR, setPortfolioXIRR] = useState(null);
  // aggregateMetrics holds computed window returns for the summary rows
  // { overall: {lifetime, xirr, monthly, yearly, daily}, individual: {...}, spy: {...} }
  const [aggregateMetrics, setAggregateMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  async function computeSPYCounterfactual(asOfDate) {
    // 1. Filter transactions to only those on or before the selected date
    const txns = df.filter(d => d.Date <= asOfDate).sort((a, b) => a.Date - b.Date);
    if (!txns.length) return null;

    // 2. Fetch SPY history
    const earliestDate = txns[0].Date;
    const spyRes = await fetch(`${ROUTE}/api/stocks/SPY?start=${earliestDate.toISOString()}&end=${asOfDate.toISOString()}`);
    const spyData = await spyRes.json();

    // 3. CRITICAL: Slice history so "today" is the asOfDate, not the literal today
    const spyHist = (spyData.quotes || []).filter(q => new Date(q.date) <= asOfDate);
    if (!spyHist.length) return null;

    // Helper: Find the closest price ON or BEFORE a specific date
    const getSpyPriceOn = (date) => {
      return spyHist.reduce((prev, curr) => {
        const currDate = new Date(curr.date);
        return (currDate <= date) ? curr : prev;
      }, spyHist[0]).close;
    };

    const currentSpyPrice = spyHist[spyHist.length - 1].close;
    let shadowSpyShares = 0;
    const cashflows = [];

    // 4. Build the Shadow Portfolio up to asOfDate
    for (let t of txns) {
      const spyPrice = getSpyPriceOn(t.Date);
      const tradeValue = t.Price * t.Shares;

      if (t.Action === "BUY") {
        shadowSpyShares += (tradeValue / spyPrice);
        cashflows.push({ date: t.Date, amount: -tradeValue });
      } else if (t.Action === "SELL") {
        shadowSpyShares -= (tradeValue / spyPrice);
        cashflows.push({ date: t.Date, amount: tradeValue });
      }
    }

    const finalValue = shadowSpyShares * currentSpyPrice;
    const cashflowsWithTerminal = [...cashflows, { date: asOfDate, amount: finalValue }];

    // 5. Calculate Lifetime Metrics
    const totalInflows = cashflowsWithTerminal.filter(c => c.amount > 0).reduce((a, b) => a + b.amount, 0);
    const totalOutflows = Math.abs(cashflowsWithTerminal.filter(c => c.amount < 0).reduce((a, b) => a + b.amount, 0));
    const lifetimeReturn = totalOutflows > 0 ? ((totalInflows - totalOutflows) / totalOutflows) * 100 : 0;
    const spyXirr = xirr(cashflowsWithTerminal) * 100;

    // 6. Calculate Window Returns (1D, 1M, 1Y)
    const computeShadowWindowReturn = (days) => {
      // Special handling for 1D to ensure it works with weekends/holidays
      if (days === 1) {
        if (spyHist.length < 2) return 0;
        const currPrice = spyHist[spyHist.length - 1].close;
        const prevPrice = spyHist[spyHist.length - 2].close;
        return ((currPrice - prevPrice) / prevPrice) * 100;
      }

      const dStart = new Date(asOfDate);
      dStart.setDate(dStart.getDate() - days);
      dStart.setHours(0, 0, 0, 0);

      const startPrice = getSpyPriceOn(dStart);

      let sharesAtStart = 0;
      let windowCashIn = 0;
      let windowCashOut = 0;

      for (let t of txns) {
        const spyPrice = getSpyPriceOn(t.Date);
        const val = t.Price * t.Shares;
        if (t.Date <= dStart) {
          if (t.Action === "BUY") sharesAtStart += (val / spyPrice);
          else sharesAtStart -= (val / spyPrice);
        } else {
          if (t.Action === "BUY") windowCashIn += val;
          else windowCashOut += val;
        }
      }

      const startVal = sharesAtStart * startPrice;
      const denominator = startVal + windowCashIn;

      return denominator > 0
        ? ((finalValue + windowCashOut - startVal - windowCashIn) / denominator) * 100
        : 0;
    };

    return {
      Ticker: "SPY Counterfactual",
      CurrentPrice: currentSpyPrice,
      LifetimeReturn: lifetimeReturn.toFixed(1),
      CAGR: spyXirr.toFixed(1),
      MonthlyReturn: computeShadowWindowReturn(30).toFixed(1),
      YearlyReturn: computeShadowWindowReturn(365).toFixed(1),
      DailyReturn: computeShadowWindowReturn(1).toFixed(1),
      Color: "",
      LogoUrl: "https://1000logos.net/wp-content/uploads/2023/04/State-Street-Global-Advisers-Logo.jpg",
      Value: finalValue,
      Weight: 0
    };
  }
  /**
   * Compute aggregate metrics for summary rows, accounting for ALL positions
   * (including those opened and closed within the window).
   *
   * Strategy:
   * - For each ticker that had ANY activity (buy or sell) on or before asOfDate,
   *   determine the shares held at windowStart and at asOfDate.
   * - Use the price history to compute the dollar return over the window.
   * - Sum across tickers to get a total-portfolio dollar return, then divide by
   *   the starting portfolio value to get a % return.
   *
   * This correctly weights:
   *   - Stocks still held: full window return
   *   - Stocks bought mid-window: return from buy date to asOfDate
   *   - Stocks sold mid-window: return from windowStart (or buy) to sell date
   *   - Stocks bought AND sold mid-window: return from buy to sell
   */
  async function computeAggregateWindowReturn(asOfDate, windowDays, historyByTicker, spyOnly = false) {
    const dEnd = new Date(asOfDate);
    dEnd.setHours(23, 59, 59, 999);

    // 1. Define window start for Monthly/Yearly
    const dStart = new Date(asOfDate);
    dStart.setDate(dStart.getDate() - windowDays);
    dStart.setHours(0, 0, 0, 0);

    let totalStartValue = 0;
    let totalEndValue = 0;
    let totalCashIn = 0;
    let totalCashOut = 0;

    const allTickers = [...new Set(df.map(d => d.Ticker))];

    for (let ticker of allTickers) {
      if (spyOnly && ticker !== "SPY") continue;
      const hist = historyByTicker[ticker];
      if (!hist || hist.length < 2) continue; // Need at least 2 points for a 1D return

      const lastIdx = hist.length - 1;
      const lastPrice = hist[lastIdx].close;

      // --- SPECIAL HANDLING FOR 1D ---
      let startPrice;
      let startShares;

      if (windowDays === 1) {
        // For 1D, startPrice is the previous trading day's close
        startPrice = hist[lastIdx - 1].close;

        // Get holdings as they were at the close of the PREVIOUS trading day
        const prevDate = new Date(hist[lastIdx - 1].date);
        const lotsAtPrevClose = getOpenLots(ticker, prevDate);
        startShares = lotsAtPrevClose.reduce((s, l) => s + l.shares, 0);
      } else {
        // Monthly/Yearly logic
        startPrice = hist.reduce((prev, curr) => {
          const currDate = new Date(curr.date);
          return (currDate <= dStart) ? curr : prev;
        }, hist[0]).close;

        const lotsAtWindowStart = getOpenLots(ticker, dStart);
        startShares = lotsAtWindowStart.reduce((s, l) => s + l.shares, 0);
      }

      totalStartValue += startShares * startPrice;

      // Capture activity WITHIN the window (between the calculated start and now)
      const windowStartLimit = windowDays === 1 ? new Date(hist[lastIdx - 1].date) : dStart;
      const windowTxns = df.filter(d =>
        d.Ticker === ticker && d.Date > windowStartLimit && d.Date <= dEnd
      );

      let currentShares = startShares;
      for (let t of windowTxns) {
        const val = t.Price * t.Shares;
        if (t.Action === "BUY") {
          totalCashIn += val;
          currentShares += t.Shares;
        } else {
          totalCashOut += val;
          currentShares -= t.Shares;
        }
      }
      totalEndValue += Math.max(0, currentShares) * lastPrice;
    }

    const denominator = totalStartValue + totalCashIn;
    if (denominator === 0) return 0;

    const numerator = totalEndValue + totalCashOut - totalStartValue - totalCashIn;
    return (numerator / denominator) * 100;
  }
  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const asOfDateJS = asOfDate.toDate();

        // 1. THIS IS THE KEY: Filter the source data immediately
        const txnsAtDate = df.filter(t => t.Date <= asOfDateJS);

        // Get only tickers that existed up to this date
        const tickers = [...new Set(txnsAtDate.map(d => d.Ticker))];

        // 2. Truncate history as discussed
        const earliestDate = new Date(Math.min(...txnsAtDate.map(d => d.Date)));
        const historyByTicker = {};

        await Promise.all(
          tickers.map(async ticker => {
            const fullHist = await fetchTickerHistory(ticker, earliestDate, asOfDateJS);
            // Only keep history points on or before our selected date
            historyByTicker[ticker] = fullHist.filter(q => new Date(q.date) <= asOfDateJS);
          })
        );

        // --- 2. Compute open holdings ---
        const results = await Promise.all(
          tickers.map(async ticker => {
            const openLots = getOpenLots(ticker, asOfDateJS);
            const totalShares = openLots.reduce((sum, l) => sum + l.shares, 0);
            if (totalShares === 0) return null;

            const hist = historyByTicker[ticker] || [];
            // The 'lastPrice' is now the price AS OF the selected date
            const lastPrice = hist.length
              ? hist[hist.length - 1].close
              : (openLots.length ? openLots[openLots.length - 1].price : 0);

            // 1M return (open lots, price-based)
            const thirtyDaysAgo = new Date(asOfDateJS);
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

            const monthly = openLots.reduce((sum, l) => {
              const startDate = l.date > thirtyDaysAgo ? l.date : thirtyDaysAgo;
              const startHist = hist.find(q => new Date(q.date) >= startDate);
              const startPrice = startHist ? startHist.close : l.price;
              const lotReturn = (lastPrice - startPrice) / startPrice;
              const lotWeight = (l.shares * lastPrice) / (openLots.reduce((s, o) => s + o.shares * lastPrice, 0));
              return sum + lotReturn * lotWeight;
            }, 0) * 100;

            // 1Y return (open lots)
            const oneYearAgo = new Date(asOfDateJS);
            oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

            const yearly = openLots.reduce((sum, l) => {
              const startDate = l.date > oneYearAgo ? l.date : oneYearAgo;
              const startHist = hist.find(q => new Date(q.date) >= startDate);
              const startPrice = startHist ? startHist.close : l.price;
              const lotReturn = (lastPrice - startPrice) / startPrice;
              const lotWeight = (l.shares * lastPrice) / (openLots.reduce((s, o) => s + o.shares * lastPrice, 0));
              return sum + lotReturn * lotWeight;
            }, 0) * 100;

            // 1D return
            const twoDaysAgo = new Date(asOfDateJS);
            twoDaysAgo.setDate(twoDaysAgo.getDate() - 5); // go back 5 days to find prev trading day
            const recentHist = hist.filter(q => new Date(q.date) >= twoDaysAgo);
            const dayIndices = hist.length;
            let dailyReturn = null;
            if (dayIndices >= 2) {
              const curr = hist[dayIndices - 1].close;
              const prev = hist[dayIndices - 2].close;
              dailyReturn = ((curr - prev) / prev) * 100;
            }

            // Lifetime return & XIRR using all lots
            const { lifetime, xirr } = computeLifetimeMetrics(ticker, asOfDateJS, lastPrice);

            return {
              Ticker: ticker,
              Shares: totalShares,
              Lots: openLots,
              CurrentPrice: lastPrice,
              LifetimeReturn: lifetime.toFixed(1),
              MonthlyReturn: monthly.toFixed(1),
              YearlyReturn: yearly.toFixed(1),
              DailyReturn: dailyReturn !== null ? dailyReturn.toFixed(1) : null,
              CAGR: xirr.toFixed(1),
              Value: totalShares * lastPrice,
              Color: openLots[0].Color,
              LogoUrl: openLots[0].LogoUrl
            };
          })
        );

        const cleaned = results.filter(Boolean);
        const totalValue = cleaned.reduce((sum, r) => sum + r.Value, 0);
        const priceMap = {};
        cleaned.forEach(r => (priceMap[r.Ticker] = r.CurrentPrice));

        // Portfolio XIRR (all tickers, all cashflows including closed)
        const allTickersEver = [...new Set(df.map(d => d.Ticker))];
        const fullPriceMap = { ...priceMap };
        // For closed tickers (not in open holdings), use last known price from history
        allTickersEver.forEach(ticker => {
          if (!fullPriceMap[ticker]) {
            const hist = historyByTicker[ticker] || [];
            if (hist.length) fullPriceMap[ticker] = hist[hist.length - 1].close;
          }
        });

        setPortfolioXIRR(computePortfolioXIRR(asOfDateJS, null, fullPriceMap));
        cleaned.forEach(r => { r.Weight = (r.Value / totalValue) * 100; });
        cleaned.sort((a, b) => b.Weight - a.Weight);

        const historyWithoutSpy = Object.fromEntries(
          Object.entries(historyByTicker).filter(([ticker]) => ticker !== "SPY")
        );

        // --- 3. Compute aggregate window returns (includes closed positions) ---
        const [aggLifetime1Y, aggLifetime1M, aggLifetime1D,
          aggInd1Y, aggInd1M, aggInd1D] = await Promise.all([
            // Overall portfolio
            computeAggregateWindowReturn(asOfDateJS, 365, historyByTicker),
            computeAggregateWindowReturn(asOfDateJS, 30, historyByTicker),
            computeAggregateWindowReturn(asOfDateJS, 1, historyByTicker),
            // Individual (non-SPY)
            computeAggregateWindowReturn(asOfDateJS, 365, historyWithoutSpy),
            computeAggregateWindowReturn(asOfDateJS, 30, historyWithoutSpy),
            computeAggregateWindowReturn(asOfDateJS, 1, historyWithoutSpy),
          ]);

        // Individual-only XIRR (exclude SPY)
        const indTickers = [...new Set(
          df.filter(t => t.Ticker !== "SPY").map(t => t.Ticker)
        )];
        const indXIRR = computePortfolioXIRR(asOfDateJS, indTickers, fullPriceMap);

        // Lifetime return for summary rows: weighted average across ALL lots ever
        // We'll use a simple dollar-weighted approach: (total terminal value - total invested) / total invested
        const computeDollarWeightedLifetime = (tickerFilter) => {
          const txns = df.filter(d =>
            d.Date <= asOfDateJS && (!tickerFilter || tickerFilter(d.Ticker))
          );
          const totalInvested = txns
            .filter(t => t.Action === "BUY")
            .reduce((sum, t) => sum + t.Price * t.Shares, 0);

          let cashflows = 0;
          // Sell proceeds
          txns.filter(t => t.Action === "SELL").forEach(t => {
            cashflows += t.Price * t.Shares;
          });
          // Current value of open positions
          const involvedTickers = [...new Set(txns.map(t => t.Ticker))];
          involvedTickers.forEach(ticker => {
            const openLots = getOpenLots(ticker, asOfDateJS);
            const price = fullPriceMap[ticker] || 0;
            cashflows += openLots.reduce((s, l) => s + l.shares * price, 0);
          });

          if (!totalInvested) return 0;
          return ((cashflows - totalInvested) / totalInvested) * 100;
        };

        const overallLifetime = computeDollarWeightedLifetime(null);
        const indLifetime = computeDollarWeightedLifetime(t => t !== "SPY");

        setAggregateMetrics({
          overall: {
            lifetime: overallLifetime,
            yearly: aggLifetime1Y,
            monthly: aggLifetime1M,
            daily: aggLifetime1D,
          },
          individual: {
            lifetime: indLifetime,
            xirr: indXIRR,
            yearly: aggInd1Y,
            monthly: aggInd1M,
            daily: aggInd1D,
          },
        });

        // --- 4. SPY counterfactual ---
        const spyBenchmarkRow = await computeSPYCounterfactual(asOfDateJS);
        const finalResults = spyBenchmarkRow ? [...cleaned, spyBenchmarkRow] : cleaned;

        setPerformance(finalResults);
      }
      catch (e) {
        console.error("Error loading investment data:", e);
      }
      finally {
        console.log('um')
        setLoading(false);
      }
    }
    load();
  }, [asOfDate]);

  const fmtPct = (val, colorClass = true) => {
    if (val === null || val === undefined) return <span className="text-slate-400">—</span>;

    let num = parseFloat(val);
    let displayValue;
    let isCapped = false;

    // Handle extreme XIRR values
    if (num > 9999) {
      displayValue = "9999%";
      isCapped = true;
    } else if (num < -999) {
      displayValue = "-999%";
      isCapped = true;
    } else {
      displayValue = `${num >= 0 ? "" : ""}${num.toFixed(1)}%`;
    }

    const cls = colorClass ? (num >= 0 ? "text-green-400" : "text-red-400") : "text-blue-400";

    return (
      <span className={cls} title={isCapped ? `${num.toFixed(2)}%` : ""}>
        {displayValue}
      </span>
    );
  };

  return (
    <section id="investments" className="py-20 bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-slate-900/20"></div>
      <div className="container mx-auto px-6 relative z-10">
        {/* Title */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Portfolio Dashboard
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            The breakdown of the performance of my stock portfolio over time.
          </p>
        </motion.div>

        {/* Date Picker */}
        <div className="flex justify-center mb-12">
          <DatePicker value={asOfDate} onChange={d => setAsOfDate(d)} className="!bg-slate-800/70 !border-slate-700 !text-white rounded-lg shadow-inner" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Pie Chart — unchanged */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="bg-gradient-to-r from-blue-400/40 to-purple-400/40 backdrop-blur-md rounded-2xl p-8 border border-slate-600/40 hover:border-blue-400/50 transition-all duration-300">
            <h3 className="text-2xl font-bold text-white mb-6">Allocation</h3>
            <div className="w-full h-96">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={performance.filter(p => p.Ticker !== "SPY Counterfactual")}
                    dataKey="Weight"
                    nameKey="Ticker"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    label={({ name, Weight }) => `${name}: ${Weight.toFixed(1)}%`}
                  >
                    {performance
                      .filter(p => p.Ticker !== "SPY Counterfactual")
                      .map((entry, idx) => (
                        <Cell key={idx} fill={entry.Color} />
                      ))}
                  </Pie>
                  <Tooltip content={<PieTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Holdings Table */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300" style={{ minHeight: '500px' }}>
            <h3 className="text-2xl font-bold text-white mb-6">Holdings</h3>

            {loading ? (
              // 5. Show a simple loader or skeletons
              <div className="flex flex-col gap-4 animate-pulse">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-10 bg-slate-700/50 rounded w-full" />
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-slate-300">
                  <thead>
                    <tr className="text-slate-400 text-sm uppercase tracking-wide border-b border-slate-700/50">
                      <th className="pb-3">Ticker</th>
                      <th className="pb-3">Price</th>
                      <th className="pb-3">Lifetime</th>
                      <th className="pb-3">XIRR</th>
                      {/* <th className="pb-3">1Y</th> */}
                      <th className="pb-3">1M</th>
                      <th className="pb-3">1D</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/50">
                    {/* Individual stock rows (open holdings only) */}
                    {performance.map((row, idx) => {
                      if (row.Ticker === "SPY Counterfactual") return null;

                      return (
                        <tr key={idx} className="hover:bg-slate-700/30 transition">
                          <td className="py-3 flex items-center gap-3 font-medium text-white">
                            <img
                              src={row.LogoUrl}
                              alt={`${row.Ticker} logo`}
                              className="w-6 h-6"
                              onError={e => e.currentTarget.style.display = 'none'}
                            />
                            {row.Ticker}
                          </td>
                          <td className="py-3">{row.CurrentPrice != null ? `$${row.CurrentPrice.toFixed(2)}` : "—"}</td>
                          <td className="py-3">{fmtPct(row.LifetimeReturn)}</td>
                          <td className="py-3">{fmtPct(row.CAGR)}</td>
                          {/* <td className="py-3">{fmtPct(row.YearlyReturn)}</td> */}
                          <td className="py-3">{fmtPct(row.MonthlyReturn)}</td>
                          <td className="py-3">{fmtPct(row.DailyReturn)}</td>
                        </tr>
                      );
                    })}

                    {/* ── Overall Portfolio summary row ── */}
                    {aggregateMetrics && (() => {
                      const { overall } = aggregateMetrics;
                      return (
                        <tr className="bg-slate-600 font-semibold border-t border-slate-500">
                          <td className="py-3 text-white">Overall Portfolio</td>
                          <td className="py-3 text-slate-300">—</td>
                          <td className="py-3">{fmtPct(overall.lifetime)}</td>
                          <td className="py-3">{fmtPct(portfolioXIRR)}</td>
                          {/* <td className="py-3">{fmtPct(overall.yearly)}</td> */}
                          <td className="py-3">{fmtPct(overall.monthly)}</td>
                          <td className="py-3">{fmtPct(overall.daily)}</td>
                        </tr>
                      );
                    })()}

                    {/* ── Individual Holdings summary row (non-SPY) ── */}
                    {aggregateMetrics && (() => {
                      const { individual } = aggregateMetrics;
                      return (
                        <tr className="bg-slate-600 font-semibold border-t border-slate-500">
                          <td className="py-3 text-white">Individual Holdings</td>
                          <td className="py-3 text-slate-300">—</td>
                          <td className="py-3">{fmtPct(individual.lifetime)}</td>
                          <td className="py-3">{fmtPct(individual.xirr)}</td>
                          {/* <td className="py-3">{fmtPct(individual.yearly)}</td> */}
                          <td className="py-3">{fmtPct(individual.monthly)}</td>
                          <td className="py-3">{fmtPct(individual.daily)}</td>
                        </tr>
                      );
                    })()}

                    {/* ── SPY Counterfactual benchmark row ── */}
                    {performance.find(p => p.Ticker === "SPY Counterfactual") && (() => {
                      const spyCounter = performance.find(p => p.Ticker === "SPY Counterfactual");
                      return (
                        <tr className="bg-slate-600 font-semibold border-t border-slate-500">
                          <td className="py-3 text-white">{spyCounter.Ticker}</td>
                          <td className="py-3 text-slate-300">—</td>
                          <td className="py-3"><span className="text-blue-400">{spyCounter.LifetimeReturn}%</span></td>
                          <td className="py-3"><span className="text-blue-400">{spyCounter.CAGR}%</span></td>
                          {/* <td className="py-3"><span className="text-blue-400">{performance.find(p => p.Ticker === "SPY")?.YearlyReturn ?? "—"}{performance.find(p => p.Ticker === "SPY")?.YearlyReturn != null ? "%" : ""}</span></td> */}
                          <td className="py-3"><span className="text-blue-400">{spyCounter.MonthlyReturn}%</span></td>
                          <td className="py-3"><span className="text-blue-400">{spyCounter.DailyReturn}%</span></td>
                        </tr>
                      );
                    })()}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}