export default function PieTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;

  const stock = payload[0].payload;

  if (stock.IsOther) {
    return (
      <div className="bg-slate-900 text-white rounded-lg p-4 shadow-lg border border-slate-700/50 min-w-[320px]">
        <h4 className="font-bold mb-2">
          Other Holdings ({stock.Holdings.length})
        </h4>

        <table className="text-left text-sm w-full border-collapse">
          <thead>
            <tr className="border-b border-slate-700/50">
              <th className="pb-1 pr-2">Ticker</th>
              <th className="pb-1 pr-2 text-right">Allocation</th>
              <th className="pb-1 text-right">Lifetime</th>
            </tr>
          </thead>

          <tbody>
            {[...stock.Holdings]
              .sort((a, b) => b.Weight - a.Weight)
              .map((holding) => {
                const lifetime = parseFloat(
                  holding.LifetimeReturn ?? 0
                );

                return (
                  <tr
                    key={holding.Ticker}
                    className="border-b border-slate-700/30"
                  >
                    <td className="py-1 pr-2 flex items-center gap-2">
                      {holding.LogoUrl && (
                        <img
                          src={holding.LogoUrl}
                          alt={holding.Ticker}
                          className="w-4 h-4"
                          onError={(e) =>
                            (e.currentTarget.style.display = "none")
                          }
                        />
                      )}

                      {holding.Ticker}
                    </td>

                    <td className="py-1 pr-2 text-right">
                      {holding.Weight.toFixed(2)}%
                    </td>

                    <td
                      className={`py-1 text-right ${lifetime >= 0
                          ? "text-green-400"
                          : "text-red-400"
                        }`}
                    >
                      {lifetime.toFixed(1)}%
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
  }

  // ------------------------
  // "Other" grouped holdings
  // ------------------------
  if (stock.IsOther) {
    return (
      <div className="bg-slate-900 text-white rounded-lg p-4 shadow-lg border border-slate-700/50 min-w-[260px]">
        <h4 className="font-bold mb-2">
          Other Holdings ({stock.Holdings.length})
        </h4>

        <table className="text-left text-sm w-full border-collapse">
          <thead>
            <tr className="border-b border-slate-700/50">
              <th className="pb-1 pr-2">Ticker</th>
              <th className="pb-1 pr-2 text-right">Allocation</th>
            </tr>
          </thead>

          <tbody>
            {stock.Holdings
              .sort((a, b) => b.Weight - a.Weight)
              .map((holding) => (
                <tr
                  key={holding.Ticker}
                  className="border-b border-slate-700/30"
                >
                  <td className="py-1 pr-2 flex items-center gap-2">
                    {holding.LogoUrl && (
                      <img
                        src={holding.LogoUrl}
                        alt={holding.Ticker}
                        className="w-4 h-4"
                        onError={(e) =>
                          (e.currentTarget.style.display = "none")
                        }
                      />
                    )}
                    {holding.Ticker}
                  </td>

                  <td className="py-1 text-right">
                    {holding.Weight.toFixed(2)}%
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }

  // ------------------------
  // Normal stock tooltip
  // ------------------------

  const openLots = stock.Lots.filter(lot => lot.shares > 0.000001);

  if (!openLots.length) return null;

  const totalPositionValue = openLots.reduce(
    (sum, lot) => sum + lot.shares * lot.price,
    0
  );

  const avgCost =
    openLots.reduce((sum, lot) => sum + lot.shares * lot.price, 0) /
    stock.Shares;

  return (
    <div className="bg-slate-900 text-white rounded-lg p-4 shadow-lg border border-slate-700/50">
      <h4 className="font-bold mb-2">
        {stock.Ticker} Purchase History
      </h4>

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
            const percent =
              ((lot.shares * lot.price) / totalPositionValue) * 100;

            return (
              <tr
                key={idx}
                className="border-b border-slate-700/30"
              >
                <td className="pr-2">
                  {lot.date.toLocaleDateString()}
                </td>

                <td className="pr-2">
                  ${lot.price.toFixed(2)}
                </td>

                <td>{percent.toFixed(1)}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <p className="mt-2 text-sm">
        <span className="font-semibold">
          Avg. Cost Basis:
        </span>{" "}
        ${avgCost.toFixed(2)}
      </p>
    </div>
  );
}