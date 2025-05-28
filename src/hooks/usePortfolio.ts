import { useEffect, useState } from 'react';
import { PortfolioItem } from '../types/portfolio';
import { fetchPortfolioItems } from '../services/api';

const usePortfolio = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchPortfolioItems();
        setPortfolioItems(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { portfolioItems, loading, error };
};

export default usePortfolio;