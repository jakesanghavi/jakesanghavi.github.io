# WIP / Archive

This directory preserves code that is **not part of the current site** but is kept for future work.

## `stocks/`
The previous `/stocks` dashboard (React components) and its Express + `yahoo-finance2`
backend. It was removed from the live site during the 2026 redesign.

- `stocks/StocksDashboard.jsx`, `MyInvestments.jsx`, `ProspectiveInvestments.jsx`, `PieToolTip.jsx`
- `backend/server.js` — stock data API
- `constants.js` — API origins/route config used by the stocks code

These files are intentionally **not imported** by the app and are excluded from linting
and the production build. If you revive this feature, relative import paths and the
`constants.js` prod/dev URLs will need to be re-checked, and the backend re-added to
`.cursor/environment.json`.
