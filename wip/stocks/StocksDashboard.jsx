import { useState } from "react";
import MyInvestments from "../components/MyInvestments"; // your original portfolio component
import ProspectiveStocksGrid from "../components/ProspectiveInvestments"; // the new grid

export default function StocksDashboard() {
  const [view, setView] = useState("portfolio"); // "portfolio" or "prospective"

  return (
    <section className="py-12 bg-slate-900 min-h-screen">
      <div className="container mx-auto px-6 relative z-10">
        {/* Toggle Buttons */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setView("portfolio")}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              view === "portfolio"
                ? "bg-blue-600 text-white"
                : "bg-slate-700/50 text-slate-300 hover:bg-slate-700/70"
            }`}
          >
            Owned Stocks
          </button>
          <button
            onClick={() => setView("prospective")}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              view === "prospective"
                ? "bg-blue-600 text-white"
                : "bg-slate-700/50 text-slate-300 hover:bg-slate-700/70"
            }`}
          >
            Prospective Stocks
          </button>
        </div>

        {/* Conditionally render the selected view */}
        {view === "portfolio" && <MyInvestments />}
        {view === "prospective" && <ProspectiveStocksGrid />}
      </div>
    </section>
  );
}