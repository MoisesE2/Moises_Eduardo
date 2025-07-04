import { useEffect, useState, useCallback } from 'react';
import { PortfolioItem } from '../types/portfolio';
import { fetchPortfolioItems, ApiError } from '../services/api';

interface UsePortfolioReturn {
  portfolioItems: PortfolioItem[];
  loading: boolean;
  error: string | null;
  retry: () => void;
  isApiError: boolean;
}

const usePortfolio = (): UsePortfolioReturn => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isApiError, setIsApiError] = useState(false);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setIsApiError(false);
      
      const data = await fetchPortfolioItems();
      setPortfolioItems(data);
    } catch (err) {
      console.error('Erro no hook usePortfolio:', err);
      
      if (err instanceof ApiError) {
        setIsApiError(true);
        setError(err.message);
      } else {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const retry = useCallback(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return { 
    portfolioItems, 
    loading, 
    error, 
    retry,
    isApiError 
  };
};

export default usePortfolio;