import { useState, useEffect } from "react";
import { DatePicker } from "antd";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import M2 from "dayjs";
import { ROUTE } from '../../constants';

// Predefined stock info
const rawData = [
  ["BUY", "Adobe", "ADBE", "2025-09-12", 348.04, 0.002, '#ec1f11'],
  ["SELL", "Palantir", "PLTR", "2025-08-29", 156.93, 0.0033, '#000000'],
  ["BUY", "ASML", "ASML", "2025-07-11", 801.06, 0.0006, '#0f248c'],
  ["BUY", "Fiserv", "FI", "2025-07-09", 171.52, 0.003, '#ff6600'],
  ["BUY", "Google", "GOOGL", "2025-07-09", 176.65, 0.003, '#fabf1d'],
  ["BUY", "Google", "GOOGL", "2025-05-08", 153.97, 0.006, '#fabf1d'],
  ["SELL", "Palantir", "PLTR", "2025-05-05", 124.42, 0.002, '#000000'],
  ["SELL", "Apple", "AAPL", "2025-05-01", 213.25, 0.001, '#080808'],
  ["BUY", "SPY", "SPY", "2025-04-09", 529.59, 0.003, '#4e9942'],
  ["SELL", "Nvidia", "NVDA", "2025-04-08", 102.94, 0.015, '#7dba17'],
  ["SELL", "Palantir", "PLTR", "2025-04-03", 84.94, 0.0095117, '#000000'],
  ["BUY", "Nvidia", "NVDA", "2025-01-29", 121.25, 0.005, '#7dba17'],
  ["BUY", "Palantir", "PLTR", "2024-12-13", 75, 0.002, '#000000'],
  ["SELL", "Microsoft", "MSFT", "2024-12-03", 429.94, 0.001, '#1ba7f0'],
  ["BUY", "Amazon", "AMZN", "2024-12-03", 213.34, 0.0017, '#ff9c1b'],
  ["BUY", "Palantir", "PLTR", "2024-08-28", 30.36, 0.0033, '#000000'],
  ["BUY", "Nvidia", "NVDA", "2024-08-28", 126.02, 0.004, '#7dba17'],
  ["BUY", "Meta", "META", "2024-04-25", 431.69, 0.0004, '#1685fe'],
  ["BUY", "Nvidia", "NVDA", "2023-11-21", 49.973, 0.01, '#7dba17'],
  ["BUY", "Microsoft", "MSFT", "2023-11-20", 375.08, 0.001, '#1ba7f0'],
  ["BUY", "Apple", "AAPL", "2023-07-14", 190.72, 0.001, '#080808'],
  ["BUY", "Palantir", "PLTR", "2023-06-12", 15.77, 0.0095117, '#000000'],
  ["BUY", "SPY", "SPY", "2023-06-01", 421.65, 0.003, '#4e9942'],
  ["BUY", "Nvidia", "NVDA", "2023-06-01", 39.434, 0.005, '#7dba17'],
  ["BUY", "SPY", "SPY", "2022-07-07", 386.78, 0.004, '#4e9942'],
  ["BUY", "SPY", "SPY", "2022-01-10", 458.2, 0.0033, '#4e9942'],
  ["SELL", "Vertex", "VRTX", "2021-08-16", 191.81, 0.0007, '#451964'],
  ["BUY", "Vertex", "VRTX", "2021-08-02", 198.73, 0.0007, '#451964'],
  ["SELL", "United Airlines", "UAL", "2021-08-02", 46.91, 0.0036, '#0a39a3'],
  ["BUY", "United Airlines", "UAL", "2021-06-18", 54.43, 0.0036, '#0a39a3'],
  ["BUY", "SPY", "SPY", "2021-03-05", 376.7, 0.004, '#4e9942']
];

const toARGB = (hex, alpha = '23') => {
  const clean = hex.replace('#', '');
  if (clean.length !== 6) {
    throw new Error(`Invalid hex color: ${hex}`);
  }
  return `${alpha}${clean}`.toUpperCase();
};

// Map to DF
const df = rawData.map(([Action, Company, Ticker, dateStr, Price, Shares, Color]) => {
  // normalize company name for simple-icons slug
  const slug = Company.toLowerCase().replace(/\s+/g, '-');
  const argbColor = toARGB(Color);
  const logoUrl = `https://api.iconify.design/simple-icons:${slug}.svg?color=%${argbColor}`;

  return {
    Action,
    Company,
    Ticker,
    Date: new Date(dateStr),
    Price,
    Shares,
    Color,
    LogoUrl: logoUrl,
  };
});

console.log(df)

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

    const thirtyDaysAgo = asOfDate.subtract(30, 'day');
    const perfStart = buyDate > thirtyDaysAgo.toDate() ? buyDate : thirtyDaysAgo.toDate();

    const histMonth = hist.quotes.filter(q => new Date(q.date) >= perfStart);

    // Decide what the starting basis should be
    const basisPrice =
      buyDate > thirtyDaysAgo.toDate() && costBasis
        ? costBasis
        : histMonth.length > 0
          ? histMonth[0].close
          : null;

    const monthly =
      histMonth.length > 0 && basisPrice
        ? ((histMonth[histMonth.length - 1].close / basisPrice) - 1) * 100
        : null;

    return { lifetime, monthly, lastPrice };

  } catch (err) {
    console.error(err);
    return { lifetime: null, monthly: null, lastPrice: null };
  }
}


export default function MyInvestments() {
  const [asOfDate, setAsOfDate] = useState(M2());
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
          Value: h.Shares * (perf.lastPrice || 0),
          Color: h.Lots[0].Color,
          LogoUrl: h.Lots[0].LogoUrl
        });

        results = results.map(r => ({
          ...r,
          Weight: r.Value / results.reduce((sum, x) => sum + x.Value, 0) * 100
        }));

        // Sort by Weighting descending
        results.sort((a, b) => b.Weight - a.Weight);
      }

      setPerformance(results);
    }
    load();
  }, [asOfDate]);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Portfolio Dashboard</h2>
      <DatePicker
        value={asOfDate}
        onChange={d => {
          setAsOfDate(d);
        }} />

      {/* Pie Chart */}
      <div className="grid grid-cols-2 gap-6">
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
              <th className="border px-2 py-1">30D Gain</th>
            </tr>
          </thead>
          <tbody>
            {performance
              .slice()
              .sort((a, b) => a.Ticker.localeCompare(b.Ticker))
              .map((row, idx) => (
                <tr key={idx}>
                  <td className="border px-2 py-1">
                    <div className="flex items-center space-x-2">
                      <img
                        src={row.LogoUrl}
                        alt={`${row.Company} logo`}
                        className="w-5 h-5"
                        onError={e => { e.currentTarget.style.display = 'none'; }}
                      />
                      <span>{row.Ticker}</span>
                    </div>
                  </td>
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
