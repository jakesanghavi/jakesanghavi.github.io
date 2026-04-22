import { useState, useEffect } from "react";
import { DatePicker } from "antd";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import M2 from "dayjs";
import { ROUTE } from '../../constants';
import { motion } from "framer-motion";
import PieTooltip from "../components/PieToolTip";

// Predefined stock info
const rawData = [
  ["BUY", "United Healthcare", "UNH", "2026-04-20", 323.31, 0.001, '#08287e', "https://1000logos.net/wp-content/uploads/2018/02/unitedhealthcare-emblem.png", "Checking"],
  ["BUY", "Microsoft", "MSFT", "2026-04-13", 393.63, 0.0018, '#1ba7f0', "https://api.iconify.design/simple-icons:microsoft.svg?color=%231BA7F0", "Checking"],
  ["BUY", "Microsoft", "MSFT", "2026-04-13", 393.53, 0.002, '#1ba7f0', "https://api.iconify.design/simple-icons:microsoft.svg?color=%231BA7F0", "Roth IRA"],
  ["BUY", "Adobe", "ADBE", "2025-03-12", 269.78, 0.0002, '#ec1f11', "https://api.iconify.design/simple-icons:adobe.svg?color=%23EC1F11", "Checking"],
  ["BUY", "Iren", "IREN", "2026-03-12", 40.45, 0.005, '#70da7e', "https://iren.com/icons/logo.svg?dpl=947", "Checking"],
  ["SELL", "Fiserv", "FISV", "2026-03-09", 60.92, 0.003, '#ff6600', "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Fiserv_logo.svg/1280px-Fiserv_logo.svg.png", "Checking"],
  ["BUY", "RobinHood", "HOOD", "2026-03-06", 77.88, 0.0125, '#ceff1a', "https://api.iconify.design/simple-icons:robinhood.svg?color=%23CEFF1A", "Checking"],
  ["BUY", "Vertiv", "VRT", "2026-03-06", 248.61, 0.0015, '#1c1c1c', "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Vertiv_logo.svg/250px-Vertiv_logo.svg.png", "Checking"],
  ["BUY", "Microsoft", "MSFT", "2026-01-30", 430.06, 0.0012, '#1ba7f0', "https://api.iconify.design/simple-icons:microsoft.svg?color=%231BA7F0", "Checking"],
  ["BUY", "Nvidia", "NVDA", "2026-01-16", 187.12, 0.004, '#7dba17', "https://api.iconify.design/simple-icons:nvidia.svg?color=%237DBA17", "Checking"],
  ["BUY", "Zeta", "ZETA", "2025-01-07", 23.39, 0.0215, '#6535ab', "https://api.iconify.design/token:zeta-chain.svg?color=%236535AB", "Checking"],
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

  // sort cashflows by date
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

    if (Math.abs(deriv) < 1e-10) break; // guard

    let newRate = rate - value / deriv;
    if (newRate < -0.9999) newRate = -0.9999; // clamp

    if (Math.abs(newRate - rate) < tol) return newRate;

    rate = newRate;
  }

  return rate;
}

function computePortfolioXIRR(asOfDate, priceMap) {
  const cashflows = [];

  for (let t of df) {
    if (t.Date > asOfDate) continue;

    const value = t.Price * t.Shares;

    if (t.Action === "BUY") cashflows.push({ date: t.Date, amount: -value });
    if (t.Action === "SELL") cashflows.push({ date: t.Date, amount: value });
  }

  for (let ticker of Object.keys(priceMap)) {
    const openLots = getOpenLots(ticker, asOfDate);
    const shares = openLots.reduce((s, l) => s + l.shares, 0);
    if (!shares) continue;

    cashflows.push({
      date: asOfDate,
      amount: shares * priceMap[ticker]
    });
  }

  return xirr(cashflows) * 100;
}


// Get open lots only (for pie chart, table, 1M return)
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

// Get all lots (open + closed) for lifetime metrics
function getAllLots(ticker, asOfDate) {
  const txns = df
    .filter(d => d.Ticker === ticker && d.Date <= asOfDate)
    .sort((a, b) => a.Date - b.Date);

  let openLots = [];
  let closedLots = [];

  for (let row of txns) {
    if (row.Action === "BUY") {
      openLots.push({ date: row.Date, shares: row.Shares, price: row.Price, Color: row.Color, LogoUrl: row.LogoUrl });
    } else if (row.Action === "SELL") {
      let sharesToSell = row.Shares;
      while (sharesToSell > 0 && openLots.length > 0) {
        if (openLots[0].shares <= sharesToSell) {
          closedLots.push({ ...openLots[0], sellPrice: row.Price, sellDate: row.Date });
          sharesToSell -= openLots[0].shares;
          openLots.shift();
        } else {
          closedLots.push({ ...openLots[0], shares: sharesToSell, sellPrice: row.Price, sellDate: row.Date });
          openLots[0].shares -= sharesToSell;
          sharesToSell = 0;
        }
      }
    }
  }

  return { openLots, closedLots };
}

// Fetch historical prices for open lots
async function fetchOpenLotsPrice(ticker, earliestDate, asOfDate) {
  const res = await fetch(`${ROUTE}/api/stocks/${ticker}?start=${earliestDate.toISOString()}&end=${asOfDate.toISOString()}`);
  const hist = await res.json();
  return hist.quotes || [];
}

// Calculate lifetime return & CAGR for all lots
function computeLifetimeMetrics(ticker, asOfDate, lastPrice) {
  const txns = df
    .filter(d => d.Ticker === ticker && d.Date <= asOfDate)
    .sort((a, b) => a.Date - b.Date);

  if (!txns.length) return { lifetime: 0, xirr: 0 };

  // Track open lots and closed lots
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

  // Add remaining open lots at lastPrice
  for (let lot of openLots) {
    cashflows.push({ date: asOfDate, amount: lot.shares * lastPrice });
  }

  // Lifetime return = (total value now + all sells − total buys) / total buys
  const totalInvested = txns
    .filter(t => t.Action === "BUY")
    .reduce((sum, t) => sum + t.Price * t.Shares, 0);

  const totalReturned = cashflows
    .filter(c => c.amount > 0)
    .reduce((sum, c) => sum + c.amount, 0);

  const lifetime = ((totalReturned - totalInvested) / totalInvested) * 100;

  // XIRR
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

  async function computeSPYCounterfactual(asOfDate) {
    const buys = df.filter(d => d.Action === "BUY" && d.Date <= asOfDate);
    if (!buys.length) return null;

    const earliestDate = new Date(Math.min(...buys.map(b => b.Date)));
    const spyRes = await fetch(`${ROUTE}/api/stocks/SPY?start=${earliestDate.toISOString()}&end=${asOfDate.toISOString()}`);
    const spyHist = await spyRes.json();
    if (!spyHist.quotes || spyHist.quotes.length === 0) return null;

    let totalInvested = 0;
    const allCashflows = [];

    for (let buy of buys) {
      const priceEntry = spyHist.quotes.find(q => new Date(q.date) >= buy.Date);
      if (!priceEntry) continue;

      const price = priceEntry.close;
      const invested = buy.Shares * buy.Price;
      totalInvested += invested;

      const shares = invested / price;

      // Cashflows per lot for XIRR
      const lotCashflows = [
        { date: buy.Date, amount: -invested },
        { date: asOfDate, amount: shares * spyHist.quotes[spyHist.quotes.length - 1].close }
      ];

      allCashflows.push(...lotCashflows);
    }

    // Portfolio XIRR now accurately accounts for timing
    const portfolioXIRRValue = xirr(allCashflows) * 100;

    // Lifetime return: net invested vs final value
    const finalValue = allCashflows.filter(c => c.amount > 0).reduce((sum, cf) => sum + cf.amount, 0);
    const lifetimeReturn = ((finalValue - totalInvested) / totalInvested) * 100;

    return {
      Ticker: "SPY Counterfactual",
      CurrentPrice: null,
      LifetimeReturn: lifetimeReturn.toFixed(2),
      CAGR: portfolioXIRRValue.toFixed(2),
      MonthlyReturn: null,
      Color: "#4e9942",
      LogoUrl: "https://1000logos.net/wp-content/uploads/2023/04/State-Street-Global-Advisers-Logo.jpg",
      Value: finalValue,
      Weight: 0
    };
  }

  useEffect(() => {
    async function load() {
      const tickers = [...new Set(df.map(d => d.Ticker))];

      // --- Portfolio holdings ---
      const results = await Promise.all(
        tickers.map(async ticker => {
          // Open lots for current holdings
          const openLots = getOpenLots(ticker, asOfDate);
          const totalShares = openLots.reduce((sum, l) => sum + l.shares, 0);
          if (totalShares === 0) return null;

          // Fetch historical prices for open lots
          const earliestOpen = new Date(Math.min(...openLots.map(l => l.date)));
          const hist = await fetchOpenLotsPrice(ticker, earliestOpen, asOfDate);
          const lastPrice = hist.length ? hist[hist.length - 1].close : openLots[openLots.length - 1].price;

          // 1M return (open lots only)
          const thirtyDaysAgo = new Date(asOfDate);
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

          const monthly = openLots.reduce((sum, l) => {
            const startDate = l.date > thirtyDaysAgo ? l.date : thirtyDaysAgo;
            const startHist = hist.find(q => new Date(q.date) >= startDate);
            const startPrice = startHist ? startHist.close : l.price;
            const lotReturn = (lastPrice - startPrice) / startPrice;
            const lotWeight = (l.shares * lastPrice) / (openLots.reduce((s, o) => s + o.shares * lastPrice, 0));
            return sum + lotReturn * lotWeight;
          }, 0) * 100;

          // Lifetime return & CAGR using all lots (open + closed)
          const { lifetime, xirr } = computeLifetimeMetrics(ticker, asOfDate, lastPrice);

          return {
            Ticker: ticker,
            Shares: totalShares,
            Lots: openLots,
            CurrentPrice: lastPrice,
            LifetimeReturn: lifetime.toFixed(2),
            MonthlyReturn: monthly.toFixed(2),
            CAGR: xirr.toFixed(2),   // label unchanged but now XIRR
            Value: totalShares * lastPrice,
            Color: openLots[0].Color,
            LogoUrl: openLots[0].LogoUrl
          };
        })
      );

      const cleaned = results.filter(Boolean);
      const totalValue = cleaned.reduce((sum, r) => sum + r.Value, 0);
      const priceMap = {};
      cleaned.forEach(r => priceMap[r.Ticker] = r.CurrentPrice);

      setPortfolioXIRR(computePortfolioXIRR(asOfDate.toDate(), priceMap));
      cleaned.forEach(r => { r.Weight = (r.Value / totalValue) * 100; });
      cleaned.sort((a, b) => b.Weight - a.Weight);

      // --- SPY counterfactual benchmark ---
      const spyBenchmarkRow = await computeSPYCounterfactual(asOfDate);
      const finalResults = spyBenchmarkRow ? [...cleaned, spyBenchmarkRow] : cleaned;

      // Set final performance
      setPerformance(finalResults);
    }

    load();
  }, [asOfDate]);

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
          {/* Pie Chart */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="bg-gradient-to-r from-blue-400/40 to-purple-400/40 backdrop-blur-md rounded-2xl p-8 border border-slate-600/40 hover:border-blue-400/50 transition-all duration-300">
            <h3 className="text-2xl font-bold text-white mb-6">Allocation</h3>
            <div className="w-full h-96">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={performance.filter(p => p.Ticker !== "SPY Counterfactual")} // exclude SPY
                    dataKey="Weight"
                    nameKey="Ticker"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    label={({ name, Weight }) => `${name}: ${Weight.toFixed(1)}%`}
                  >
                    {performance
                      .filter(p => p.Ticker !== "SPY Counterfactual") // exclude SPY for coloring
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
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300">
            <h3 className="text-2xl font-bold text-white mb-6">Holdings</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-slate-300">
                <thead>
                  <tr className="text-slate-400 text-sm uppercase tracking-wide border-b border-slate-700/50">
                    <th className="pb-3">Ticker</th>
                    <th className="pb-3">Current</th>
                    <th className="pb-3">Lifetime</th>
                    <th className="pb-3">XIRR</th>
                    <th className="pb-3">1M</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {/* Stock rows */}
                  {performance.map((row, idx) => {
                    // Skip SPY for now; will render at the end
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

                        {/* Current Price */}
                        <td className="py-3">{row.CurrentPrice != null ? `$${row.CurrentPrice.toFixed(2)}` : "—"}</td>

                        {/* Lifetime Return */}
                        <td className={`py-3 ${row.LifetimeReturn >= 0 ? "text-green-400" : "text-red-400"}`}>
                          {row.LifetimeReturn != null ? `${row.LifetimeReturn}%` : "—"}
                        </td>

                        {/* CAGR */}
                        <td className={`py-3 ${row.CAGR >= 0 ? "text-green-400" : "text-red-400"}`}>
                          {row.CAGR != null ? `${row.CAGR}%` : "—"}
                        </td>

                        {/* 1M Return */}
                        <td className={`py-3 ${row.MonthlyReturn != null && row.MonthlyReturn >= 0 ? "text-green-400" : "text-red-400"}`}>
                          {row.MonthlyReturn != null ? `${row.MonthlyReturn}%` : "—"}
                        </td>
                      </tr>
                    );
                  })}

                  {/* Overall Portfolio row (stocks only) */}
                  {performance.length > 0 && (() => {
                    const totalValue = performance.reduce((sum, p) => p.Ticker === "SPY Counterfactual" ? sum : sum + p.Value, 0);

                    const overallLifetime = performance.reduce((sum, p) =>
                      p.Ticker === "SPY Counterfactual" ? sum : sum + (p.LifetimeReturn || 0) * p.Value / totalValue, 0
                    );

                    const overall30D = performance.reduce((sum, p) =>
                      p.Ticker === "SPY Counterfactual" ? sum : sum + (p.MonthlyReturn || 0) * p.Value / totalValue, 0
                    );

                    return (
                      <tr className="bg-slate-600 font-semibold border-t border-slate-500">
                        <td className="py-3 text-white">Overall Portfolio</td>
                        <td className="py-3 text-slate-300">—</td>

                        {/* Lifetime % calculated properly */}
                        <td className={`py-3 ${overallLifetime >= 0 ? "text-green-400" : "text-red-400"}`}>
                          {overallLifetime.toFixed(2)}%
                        </td>

                        {/* XIRR is the gold standard CAGR */}
                        <td className={`py-3 ${portfolioXIRR !== null && portfolioXIRR >= 0 ? "text-green-400" : "text-red-400"}`}>
                          {portfolioXIRR?.toFixed(2)}%
                        </td>

                        {/* 1M return */}
                        <td className={`py-3 ${overall30D >= 0 ? "text-green-400" : "text-red-400"}`}>
                          {overall30D.toFixed(2)}%
                        </td>
                      </tr>
                    );
                  })()}

                  {/* SPY Counterfactual benchmark as last row */}
                  {performance.find(p => p.Ticker === "SPY Counterfactual") && (() => {
                    const spy = performance.find(p => p.Ticker === "SPY Counterfactual");
                    return (
                      <tr className="bg-slate-600 font-semibold border-t border-slate-500">
                        <td className="py-3 text-white">{spy.Ticker}</td>
                        <td className="py-3 text-slate-300">—</td>
                        <td className="py-3 text-blue-400">{spy.LifetimeReturn}%</td>
                        <td className="py-3 text-blue-400">{spy.CAGR}%</td>
                        <td className="py-3 text-blue-400">{performance.find(p => p.Ticker === "SPY")?.MonthlyReturn || "—"}%</td>
                      </tr>
                    );
                  })()}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
