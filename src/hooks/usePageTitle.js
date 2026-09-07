import { useEffect } from 'react';

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · Jake Sanghavi` : 'Jake Sanghavi';
  }, [title]);
}
