export default function PieTooltip({ active, payload }) {
  if (!active || !payload || payload.length === 0) return null;

  const stock = payload[0].payload;

  // Rounding errors
  const openLots = stock.Lots.filter(lot => lot.shares > 0.000001);

  if (openLots.length === 0) return null;

  return (
    <div className="bg-slate-900 text-white rounded-lg p-4 shadow-lg border border-slate-700/50">
      <h4 className="font-bold mb-2">{stock.Ticker} Purchase History</h4>
      <table className="text-left text-sm w-full border-collapse">
        <thead>
          <tr className="border-b border-slate-700/50">
            <th className="pb-1 pr-2">Date</th>
            <th className="pb-1 pr-2">Price</th>
            <th className="pb-1">Holding%</th>
          </tr>
        </thead>
        <tbody>
          {openLots.map((lot, idx) => {
            const totalShares = stock.Shares;
            const percent = ((lot.shares / totalShares) * 100).toFixed(1);
            return (
              <tr key={idx} className="border-b border-slate-700/30">
                <td className="pr-2">{lot.date.toLocaleDateString()}</td>
                <td className="pr-2">${lot.price.toFixed(2)}</td>
                <td>{percent}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="mt-2 text-sm">
        <span className="font-semibold">Avg. Cost Basis:</span> ${(
          openLots.reduce((sum, l) => sum + l.shares * l.price, 0) /
          stock.Shares
        ).toFixed(2)}
      </p>
    </div>
  );
}