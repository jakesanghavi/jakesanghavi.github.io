import { useState, useEffect } from "react";
import { DatePicker } from "antd";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import M2 from "dayjs";
import { ROUTE } from '../../constants';
import { motion } from "framer-motion";
import PieTooltip from "../components/PieToolTip";

// Predefined stock info
const rawData = [
  ["BUY", "Amazon", "AMZN", "2025-10-23", 221.07, 0.0035, '#ff9c1b', "https://api.iconify.design/simple-icons:amazon.svg?color=%23FF9C1B", "Checking"],
  ["BUY", "Adobe", "ADBE", "2025-09-12", 348.04, 0.002, '#ec1f11', "https://api.iconify.design/simple-icons:adobe.svg?color=%23EC1F11", "Checking"],
  ["SELL", "Palantir", "PLTR", "2025-08-29", 156.93, 0.0033, '#000000', "https://api.iconify.design/simple-icons:palantir.svg?color=%23000000", "Checking"],
  ["BUY", "ASML", "ASML", "2025-07-11", 801.06, 0.0006, '#0f248c', "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0ibQsZPMfxRsF3gl0CV6fK48yi6MXfOSR9g&s", "Checking"],
  ["BUY", "Fiserv", "FI", "2025-07-09", 171.52, 0.003, '#ff6600', "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Fiserv_logo.svg/1280px-Fiserv_logo.svg.png", "Checking"],
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
  ["BUY", "SPY", "SPY", "2023-06-01", 421.65, 0.003, '#4e9942', "https://1000logos.net/wp-content/uploads/2023/04/State-Street-Global-Advisers-Logo.jpg", "Checking"],
  ["BUY", "Nvidia", "NVDA", "2023-06-01", 39.434, 0.005, '#7dba17', "https://api.iconify.design/simple-icons:nvidia.svg?color=%237DBA17", "Checking"],
  ["BUY", "SPY", "SPY", "2022-07-07", 386.78, 0.004, '#4e9942', "https://1000logos.net/wp-content/uploads/2023/04/State-Street-Global-Advisers-Logo.jpg", "Checking"],
  ["BUY", "SPY", "SPY", "2022-01-10", 458.2, 0.0033, '#4e9942', "https://1000logos.net/wp-content/uploads/2023/04/State-Street-Global-Advisers-Logo.jpg", "Checking"],
  ["SELL", "Vertex", "VRTX", "2021-08-16", 191.81, 0.0007, '#451964', "https://api.iconify.design/simple-icons:vertex.svg?color=%23451964", "Checking"],
  ["BUY", "Vertex", "VRTX", "2021-08-02", 198.73, 0.0007, '#451964', "https://api.iconify.design/simple-icons:vertex.svg?color=%23451964", "Checking"],
  ["SELL", "United Airlines", "UAL", "2021-08-02", 46.91, 0.0036, '#0a39a3', "https://api.iconify.design/simple-icons:united-airlines.svg?color=%230A39A3", "Checking"],
  ["BUY", "United Airlines", "UAL", "2021-06-18", 54.43, 0.0036, '#0a39a3', "https://api.iconify.design/simple-icons:united-airlines.svg?color=%230A39A3", "Checking"],
  ["BUY", "SPY", "SPY", "2021-03-05", 376.7, 0.004, '#4e9942', "https://1000logos.net/wp-content/uploads/2023/04/State-Street-Global-Advisers-Logo.jpg", "Checking"]
];

// Map to DF
const df = rawData.map(([Action, Company, Ticker, dateStr, Price, Shares, Color, LogoUrl]) => {
  return {
    Action,
    Company,
    Ticker,
    Date: new Date(dateStr),
    Price,
    Shares,
    Color,
    LogoUrl: LogoUrl,
  };
});

// Get currently owned stock amount by ticker and date
function getOpenLots(ticker, asOfDate) {
  const txns = df.filter(d => d.Ticker === ticker && d.Date <= asOfDate).sort((a, b) => a.Date - b.Date);
  let lots = [];
  for (let row of txns) {
    if (row.Action === "BUY") {
      lots.push({ date: row.Date, shares: row.Shares, price: row.Price, Color: row.Color, LogoUrl: row.LogoUrl });
    } else {
      let sharesToSell = row.Shares;
      while (sharesToSell > 0 && lots.length > 0) {
        if (lots[0].shares <= sharesToSell) {
          sharesToSell -= lots[0].shares;
          lots.shift();
        } else {
          lots[0].shares -= sharesToSell;
          sharesToSell = 0;
        }
      }
    }
  }
  return lots;
}


// Get current holdings given a date
// Uses getOpenLots above
function getHoldings(asOfDate) {
  const tickers = [...new Set(df.map(d => d.Ticker))];
  return tickers.map(ticker => {
    const lots = getOpenLots(ticker, asOfDate);
    if (lots.length === 0) return null;
    const totalShares = lots.reduce((sum, l) => sum + l.shares, 0);
    return { Ticker: ticker, Shares: totalShares, Lots: lots };
  }).filter(Boolean);
}

// Call to Yahoo finance to get historical performance
// for a ticket
async function getPerformance(ticker, lots, asOfDate) {
  try {
    // Use the earliest buy date for fetching historical prices
    const earliestBuyDate = new Date(Math.min(...lots.map(l => l.date)));
    const res = await fetch(
      `${ROUTE}/api/stocks/${ticker}?start=${earliestBuyDate.toISOString()}&end=${asOfDate.toISOString()}`
    );
    const hist = await res.json();

    if (!hist.quotes || hist.quotes.length === 0)
      return { lifetime: null, monthly: null, lastPrice: null, cagr: null };

    const lastPrice = hist.quotes[hist.quotes.length - 1].close;
    const totalValue = lots.reduce((sum, l) => sum + l.shares * lastPrice, 0);
    const lifetime = lots.reduce((sum, l) => {
      const lotReturn = (lastPrice - l.price) / l.price;
      const lotWeight = (l.shares * lastPrice) / totalValue;
      return sum + lotReturn * lotWeight;
    }, 0) * 100;

    const weightedCAGR = lots.reduce((sum, l) => {
      const years = (asOfDate - l.date) / (1000 * 60 * 60 * 24 * 365.25);
      const lotCAGR = years > 0 ? Math.pow(lastPrice / l.price, 1 / years) - 1 : 0;
      const lotWeight = (l.shares * lastPrice) / totalValue;
      return sum + lotCAGR * lotWeight;
    }, 0) * 100;

    // Monthly return (last 30 days or since purchase)
    const thirtyDaysAgo = asOfDate.subtract(1, 'month').subtract(1, 'day').toDate();
    // const perfStart = new Date(Math.max(...lots.map(l => l.date), thirtyDaysAgo));
    let monthly = lots.reduce((sum, l) => {
      // Determine start date for this lot
      const startDate = l.date > thirtyDaysAgo ? l.date : thirtyDaysAgo;
      console.log(l.date)

      // Find closest historical price on or after startDate
      const startHist = hist.quotes.find(q => new Date(q.date) >= startDate);
      console.log(startHist)
      const startPrice = startHist ? startHist.close : l.price;

      const lotReturn = (lastPrice - startPrice) / startPrice;
      const lotWeight = (l.shares * lastPrice) / totalValue;
      return sum + lotReturn * lotWeight;
    }, 0) * 100;

    return {
      lastPrice,
      lifetime,
      monthly,
      cagr: weightedCAGR
    };
  } catch (err) {
    console.error(err);
    return { lifetime: null, monthly: null, lastPrice: null, cagr: null };
  }
}

export default function MyInvestments() {
  const [asOfDate, setAsOfDate] = useState(M2());
  const [performance, setPerformance] = useState([]);

  useEffect(() => {
    async function load() {
      const holdings = getHoldings(asOfDate);
      let results = [];

      for (let h of holdings) {
        const totalCost = h.Lots.reduce((sum, l) => sum + l.shares * l.price, 0);
        const totalShares = h.Lots.reduce((sum, l) => sum + l.shares, 0);
        // const costBasis = totalCost / totalShares;
        // const buyDate = new Date(Math.min(...h.Lots.map(l => l.date)));

        const perf = await getPerformance(h.Ticker, h.Lots, asOfDate);

        results.push({
          Ticker: h.Ticker,
          Shares: h.Shares,
          Lots: h.Lots,
          CurrentPrice: perf.lastPrice?.toFixed(2),
          LifetimeReturn: perf.lifetime ? perf.lifetime.toFixed(2) : null,
          MonthlyReturn: perf.monthly ? perf.monthly.toFixed(2) : null,
          CAGR: perf.cagr ? perf.cagr.toFixed(2) : null,
          Value: h.Shares * (perf.lastPrice || 0),
          Color: h.Lots[0].Color,
          LogoUrl: h.Lots[0].LogoUrl
        });

        results = results.map(r => ({
          ...r,
          Weight: r.Value / results.reduce((sum, x) => sum + x.Value, 0) * 100
        }));

        results.sort((a, b) => b.Weight - a.Weight);
      }

      setPerformance(results);
    }
    load();
  }, [asOfDate]);

  return (
    <section id="investments" className="py-20 bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-slate-900/20"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Portfolio Dashboard
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            The breakdown of the performance of my stock portfolio over time.
          </p>
        </motion.div>

        {/* Date picker */}
        <div className="flex justify-center mb-12">
          <DatePicker
            value={asOfDate}
            onChange={d => setAsOfDate(d)}
            className="!bg-slate-800/70 !border-slate-700 !text-white rounded-lg shadow-inner"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Pie Chart Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-blue-400/40 to-purple-400/40 backdrop-blur-md rounded-2xl p-8 border border-slate-600/40 hover:border-blue-400/50 transition-all duration-300"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Allocation</h3>
            <div className="w-full h-96">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={performance}
                    dataKey="Weight"
                    nameKey="Ticker"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    label={({ name, Weight }) => `${name}: ${Weight.toFixed(1)}%`}
                  >
                    {performance.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.Color} />
                    ))}
                  </Pie>
                  <Tooltip content={<PieTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Holdings Table Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Holdings</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-slate-300">
                <thead>
                  <tr className="text-slate-400 text-sm uppercase tracking-wide border-b border-slate-700/50">
                    <th className="pb-3">Ticker</th>
                    <th className="pb-3">Current</th>
                    <th className="pb-3">Lifetime</th>
                    <th className="pb-3">CAGR</th>
                    <th className="pb-3">1M</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {performance
                    .slice()
                    .sort((a, b) => a.Ticker.localeCompare(b.Ticker))
                    .map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-700/30 transition">
                        <td className="py-3 flex items-center gap-3 font-medium text-white">
                          <img
                            src={row.LogoUrl}
                            alt={`${row.Company} logo`}
                            className="w-6 h-6"
                            onError={e => { e.currentTarget.style.display = 'none'; }}
                          />
                          {row.Ticker}
                        </td>
                        <td className="py-3">${row.CurrentPrice}</td>
                        <td
                          className={`py-3 ${row.LifetimeReturn >= 0 ? "text-green-400" : "text-red-400"
                            }`}
                        >
                          {row.LifetimeReturn}%
                        </td>
                        <td
                          className={`py-3 ${row.CAGR >= 0 ? "text-green-400" : "text-red-400"
                            }`}
                        >
                          {row.CAGR != null && row.CAGR !== ""
                            ? `${row.CAGR}%`
                            : `${row.CAGR}%`}
                        </td>
                        <td
                          className={`py-3 ${row.MonthlyReturn >= 0 ? "text-green-400" : "text-red-400"
                            }`}
                        >
                          {row.MonthlyReturn != null && row.MonthlyReturn !== ""
                            ? `${row.MonthlyReturn}%`
                            : `${row.LifetimeReturn}%`}
                        </td>
                      </tr>
                    ))}
                  {performance.length > 0 && (() => {
                    const totalValue = performance.reduce((sum, p) => sum + p.Value, 0);

                    const overallLifetime = performance.reduce((sum, p) => sum + (p.LifetimeReturn || 0) * p.Value / totalValue, 0);
                    const overallCAGR = performance.reduce((sum, p) => sum + (p.CAGR || 0) * p.Value / totalValue, 0);
                    const overall30D = performance.reduce((sum, p) => sum + (p.MonthlyReturn || 0) * p.Value / totalValue, 0);

                    return (
                      <tr className="bg-slate-700/40 font-semibold border-t border-slate-600/50">
                        <td className="py-3 text-white">Overall Portfolio</td>
                        <td className="py-3 text-slate-300">—</td>
                        <td className={`py-3 text-white`}>
                          {/* {overallLifetime.toFixed(2)}% */}
                          —
                        </td>
                        <td className={`py-3 text-white`}>
                          {/* {overallCAGR.toFixed(2)}% */}
                          —
                        </td>
                        <td className={`py-3 ${overall30D >= 0 ? "text-green-400" : "text-red-400"}`}>
                          {overall30D.toFixed(2)}%
                        </td>
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
