import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeProvider';
import SiteShell from './components/SiteShell';
import HomePage from './pages/HomePage';
import ResumePage from './pages/ResumePage';
import BlogPage, { BlogPostPage } from './pages/BlogPage';

const StocksDashboard = lazy(() => import('./pages/StocksDashboard'));

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Suspense fallback={<div className="page-hero wrap">Loading…</div>}>
          <Routes>
            <Route element={<SiteShell />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/resume" element={<ResumePage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/stocks" element={<StocksDashboard />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}
