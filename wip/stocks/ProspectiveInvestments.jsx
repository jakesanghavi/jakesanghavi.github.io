import { useState, useEffect } from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, Legend } from "recharts";
import { motion } from "framer-motion";
import { ROUTE } from "../../constants";

// --- Watchlist ---
const tickers = ["ORCL", 'MELI', 'NVO', 'INTC'];

const round2 = (num) => (num != null ? Math.round(num * 100) / 100 : null);

export default function ProspectiveInvestments() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("1M");
  const [prices, setPrices] = useState({});
  const [financials, setFinancials] = useState({});

  // Fetch financials
  useEffect(() => {
    async function loadFinancials() {
      const data = {};
      await Promise.all(
        tickers.map(async (ticker) => {
          try {
            const res = await fetch(`${ROUTE}/api/stocks/${ticker}/financials`);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const json = await res.json();

            console.log(json)

            // Round main fields
            data[ticker] = {
              ...json,
              currentPrice: round2(json.currentPrice),
              targetHighPrice: round2(json.targetHighPrice),
              targetLowPrice: round2(json.targetLowPrice),
              targetMedianPrice: round2(json.targetMedianPrice),
              forwardPE: round2(json.forwardPE),
              profitMargins: round2(json.profitMargins * 100),
              debtToEquity: round2(json.debtToEquity),
              enterpriseToEbitda: round2(json.enterpriseToEbitda),
              marketCap: round2(json.marketCap),
              earnings: json.earnings.map(q => ({
                ...q,
                actual: round2(q.actual),
                estimate: round2(q.estimate),
                surprisePct: round2(((q.actual - q.estimate) / q.estimate) * 100)
              })),
              financialsChart: {
                ...json.financialsChart,
                quarterly: json.financialsChart.quarterly.map(q => ({
                  ...q,
                  revenue: round2(q.revenue / 1e9), // billions
                  earnings: round2(q.earnings / 1e9)
                }))
              }
            };
          } catch (err) {
            console.error(`Failed to fetch ${ticker} financials:`, err);
          }
        })
      );
      setFinancials(data);
    }
    loadFinancials();
  }, []);

  // Fetch historical prices
  useEffect(() => {
    async function loadPrices() {
      const data = {};
      const now = new Date();
      const past = new Date();
      past.setFullYear(past.getFullYear() - 1);

      await Promise.all(
        tickers.map(async (ticker) => {
          try {
            const res = await fetch(`${ROUTE}/api/stocks/${ticker}?start=${past.toISOString()}&end=${now.toISOString()}`);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const json = await res.json();
            data[ticker] = (json.quotes || []).map(q => ({
              date: q.date,
              close: round2(q.close)
            }));
          } catch (err) {
            console.error(`Failed to fetch ${ticker} prices:`, err);
            data[ticker] = [];
          }
        })
      );

      setPrices(data);
    }
    loadPrices();
  }, []);

  const timeframeOptions = ["1M", "3M", "6M", "1Y"];

  return (
    <section className="py-20 bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-slate-900/20"></div>
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Prospective Stocks
          </h2>
        </motion.div>

        <div className="flex flex-col gap-6">
          {tickers.map((ticker, idx) => {
            const info = financials[ticker] || {};
            const priceData = prices[ticker] || [];

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 grid lg:grid-cols-3 gap-6"
              >
                {/* Left column stacked */}
                <div className="flex flex-col gap-6 lg:col-span-2">
                  {/* Price chart */}
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2 mb-2 justify-center lg:justify-start">
                      {timeframeOptions.map(tf => (
                        <button
                          key={tf}
                          className={`px-2 py-1 text-sm rounded ${
                            tf === selectedTimeframe
                              ? "bg-blue-500 text-white"
                              : "bg-slate-700/50 text-slate-300"
                          }`}
                          onClick={() => setSelectedTimeframe(tf)}
                        >
                          {tf}
                        </button>
                      ))}
                    </div>
                    <div className="w-full h-40">
                      <ResponsiveContainer>
                        <LineChart data={priceData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis dataKey="date" hide />
                          <YAxis domain={["auto", "auto"]} hide />
                          <Tooltip
                            contentStyle={{ backgroundColor: "#1e293b", border: "none", color: "#fff" }}
                            formatter={(value) => `$${value}`}
                          />
                          <Line type="monotone" dataKey="close" stroke="#4f46e5" strokeWidth={2} dot={false} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Quarterly bar chart */}
                  <div className="w-full h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={info.financialsChart?.quarterly || []}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                        <XAxis dataKey="date" tick={{ fill: '#fff' }} />
                        <YAxis tick={{ fill: '#fff' }} />
                        <Tooltip contentStyle={{ backgroundColor: '#222' }} />
                        <Legend wrapperStyle={{ color: '#fff' }} />
                        <Bar dataKey="revenue" fill="#1ba7f0" name="Revenue (B$)" />
                        <Bar dataKey="earnings" fill="#7dba17" name="Earnings (B$)" />
                        <Bar dataKey="surprisePct" fill="#ff9c1b" name="Surprise %" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Right column: fundamentals */}
                <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 flex flex-col gap-2">
                  <h3 className="text-xl font-bold text-white mb-2">{ticker} Fundamentals</h3>
                  <div className="text-slate-300 space-y-1">
                    <div>Market Cap: ${info.marketCap?.toLocaleString()}</div>
                    <div>Current Price: ${info.currentPrice}</div>
                    <div>Forward P/E: {info.forwardPE}</div>
                    <div>Profit Margins: {info.profitMargins}%</div>
                    <div>Debt / Equity: {info.debtToEquity}</div>
                    <div>Enterprise / EBITDA: {info.enterpriseToEbitda}</div>
                    <div>Shares Outstanding: {info.sharesOutstanding?.toLocaleString()}</div>
                    <div>Price / Book: {info.priceToBook}</div>
                    <div>Target High: ${info.targetHighPrice}</div>
                    <div>Target Low: ${info.targetLowPrice}</div>
                    <div>Target Median: ${info.targetMedianPrice}</div>
                    <div>Recommendation: {info.recommendationKey}</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}