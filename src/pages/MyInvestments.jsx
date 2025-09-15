import { useState, useEffect } from "react";
import { DatePicker } from "antd";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import moment from "moment";
import { ROUTE } from '../../constants';

// Predefined stock info
const rawData = [
  ["BUY", "Adobe", "ADBE", "2025-09-12", 348.04, 0.002],
  ["SELL", "Palantir", "PLTR", "2025-08-29", 156.93, 0.0033],
  ["BUY", "ASML", "ASML", "2025-07-11", 801.06, 0.0006],
  ["BUY", "Fiserv", "FI", "2025-07-09", 171.52, 0.003],
  ["BUY", "Google", "GOOGL", "2025-07-09", 176.65, 0.003],
  ["BUY", "Google", "GOOGL", "2025-05-08", 153.97, 0.006],
  ["SELL", "Palantir", "PLTR", "2025-05-05", 124.42, 0.002],
  ["SELL", "Apple", "AAPL", "2025-05-01", 213.25, 0.001],
  ["BUY", "SPY", "SPY", "2025-04-09", 529.59, 0.003],
  ["SELL", "Nvidia", "NVDA", "2025-04-08", 102.94, 0.015],
  ["SELL", "Palantir", "PLTR", "2025-04-03", 84.94, 0.0095117],
  ["BUY", "Nvidia", "NVDA", "2025-01-29", 121.25, 0.005],
  ["BUY", "Palantir", "PLTR", "2024-12-13", 75, 0.002],
  ["SELL", "Microsoft", "MSFT", "2024-12-03", 429.94, 0.001],
  ["BUY", "Amazon", "AMZN", "2024-12-03", 213.34, 0.0017],
  ["BUY", "Palantir", "PLTR", "2024-08-28", 30.36, 0.0033],
  ["BUY", "Nvidia", "NVDA", "2024-08-28", 126.02, 0.004],
  ["BUY", "Meta", "META", "2024-04-25", 431.69, 0.0004],
  ["BUY", "Nvidia", "NVDA", "2023-11-21", 49.973, 0.01],
  ["BUY", "Microsoft", "MSFT", "2023-11-20", 375.08, 0.001],
  ["BUY", "Apple", "AAPL", "2023-07-14", 190.72, 0.001],
  ["BUY", "Palantir", "PLTR", "2023-06-12", 15.77, 0.0095117],
  ["BUY", "SPY", "SPY", "2023-06-01", 421.65, 0.003],
  ["BUY", "Nvidia", "NVDA", "2023-06-01", 39.434, 0.005],
  ["BUY", "SPY", "SPY", "2022-07-07", 386.78, 0.004],
  ["BUY", "SPY", "SPY", "2022-01-10", 458.2, 0.0033],
  ["SELL", "Vertex", "VRTX", "2021-08-16", 191.81, 0.0007],
  ["BUY", "Vertex", "VRTX", "2021-08-02", 198.73, 0.0007],
  ["SELL", "United Airlines", "UAL", "2021-08-02", 46.91, 0.0036],
  ["BUY", "United Airlines", "UAL", "2021-06-18", 54.43, 0.0036],
  ["BUY", "SPY", "SPY", "2021-03-05", 376.7, 0.004]
];

// Map to DF
const df = rawData.map(([Action, Company, Ticker, dateStr, Price, Shares]) => ({
  Action,
  Company,
  Ticker,
  Date: new Date(dateStr),
  Price,
  Shares
}));


// Get currently owned stock amount by ticker and date
function getOpenLots(ticker, asOfDate) {
  const txns = df.filter(d => d.Ticker === ticker && d.Date <= asOfDate).sort((a, b) => a.Date - b.Date);
  let lots = [];
  for (let row of txns) {
    if (row.Action === "BUY") {
      lots.push({ date: row.Date, shares: row.Shares, price: row.Price });
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
async function getPerformance(ticker, costBasis, buyDate, asOfDate) {
  try {
    const res = await fetch(
      `${ROUTE}/api/stocks/${ticker}?start=${buyDate.toISOString()}&end=${asOfDate.toISOString()}`
    );
    const hist = await res.json();

    if (!hist.quotes || hist.quotes.length === 0)
      return { lifetime: null, monthly: null, lastPrice: null };

    const lastPrice = hist.quotes[hist.quotes.length - 1].close;
    const lifetime = (lastPrice / costBasis - 1) * 100;

    const monthStart = new Date(asOfDate);
    monthStart.setDate(1);
    const perfStart = buyDate > monthStart ? buyDate : monthStart;

    const histMonth = hist.quotes.filter(q => new Date(q.date) >= perfStart);
    const monthly = (histMonth[histMonth.length - 1].close / histMonth[0].close - 1) * 100;

    return { lifetime, monthly, lastPrice };
  } catch (err) {
    console.error(err);
    return { lifetime: null, monthly: null, lastPrice: null };
  }
}


export default function MyInvestments() {
  const [asOfDate, setAsOfDate] = useState(new Date(Math.max(...df.map(d => d.Date))));
  const [performance, setPerformance] = useState([]);

  // Load in the stock data
  useEffect(() => {
    async function load() {
      const holdings = getHoldings(asOfDate);
      let results = [];

      for (let h of holdings) {
        const totalCost = h.Lots.reduce((sum, l) => sum + l.shares * l.price, 0);
        const totalShares = h.Lots.reduce((sum, l) => sum + l.shares, 0);
        const costBasis = totalCost / totalShares;
        const buyDate = new Date(Math.min(...h.Lots.map(l => l.date)));

        const perf = await getPerformance(h.Ticker, costBasis, buyDate, asOfDate);

        results.push({
          Ticker: h.Ticker,
          Shares: h.Shares,
          CurrentPrice: perf.lastPrice?.toFixed(2),
          LifetimeReturn: perf.lifetime ? perf.lifetime.toFixed(2) : null,
          MonthlyReturn: perf.monthly ? perf.monthly.toFixed(2) : null,
          Value: h.Shares * (perf.lastPrice || 0)
        });
      }

      setPerformance(results);
    }
    load();
  }, [asOfDate]);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Portfolio Dashboard</h2>
      <DatePicker
        value={moment(asOfDate)}
        onChange={d => setAsOfDate(d.toDate())}
      />

      {/* Pie Chart */}
      <div className="grid grid-cols-2 gap-6">
        <div className="w-full h-96">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={performance}
                dataKey="Value"
                nameKey="Ticker"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
              >
                {performance.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={"#" + ((Math.random() * 0xffffff) << 0).toString(16)} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Stocks Table */}
        <table className="table-auto border-collapse border border-gray-300 w-full">
          <thead>
            <tr>
              <th className="border px-2 py-1">Ticker</th>
              <th className="border px-2 py-1">Current Price</th>
              <th className="border px-2 py-1">Lifetime Gain</th>
              <th className="border px-2 py-1">1M Gain</th>
            </tr>
          </thead>
          <tbody>
            {performance.map((row, idx) => (
              <tr key={idx}>
                <td className="border px-2 py-1">{row.Ticker}</td>
                <td className="border px-2 py-1">{row.CurrentPrice}</td>
                <td className="border px-2 py-1">{row.LifetimeReturn}%</td>
                <td className="border px-2 py-1">
                  {row.MonthlyReturn != null && row.MonthlyReturn !== ""
                    ? `${row.MonthlyReturn}%`
                    : `${row.LifetimeReturn}%`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
