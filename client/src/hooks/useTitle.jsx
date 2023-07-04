import { useEffect } from 'react';

export function useTitle(title) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = `${title} - ${prevTitle}`;
    return () => {
      document.title = prevTitle;
    };
  }, []);
}
