import { useState, useEffect, useCallback } from 'react';
import { Brewery, SearchFilters, PaginationState } from '@/types/brasseries';

const API_BASE_URL = 'https://api.openbrewerydb.org/breweries';

interface UseBreweriesReturn {
  breweries: Brewery[];
  loading: boolean;
  error: string | null;
  pagination: PaginationState;
  searchBreweries: (filters: SearchFilters) => void;
  loadMore: () => void;
  refresh: () => void;
  setPage: (page: number) => void; 
}

export const useBreweries = (): UseBreweriesReturn => {
  const [breweries, setBreweries] = useState<Brewery[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    perPage: 20,
    total: 0,
  });
  const [currentFilters, setCurrentFilters] = useState<SearchFilters>({
    query: ''
  });

  const fetchBreweries = useCallback(
    async (filters: SearchFilters, page: number = 1, append: boolean = false) => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();
        if (filters.query) params.append('by_name', filters.query);
        if (filters.state) params.append('by_state', filters.state);
        if (filters.city) params.append('by_city', filters.city);
        if (filters.type) params.append('by_type', filters.type);

        params.append('page', page.toString());
        params.append('per_page', pagination.perPage.toString());

        const response = await fetch(`${API_BASE_URL}?${params}`);
        if (!response.ok) throw new Error(`API Error: ${response.status}`);

        const data: Brewery[] = await response.json();
        const validBreweries = data.filter(brewery => brewery.latitude && brewery.longitude);

        setBreweries(prev => append ? [...prev, ...validBreweries] : validBreweries);

        setPagination(prev => ({
          ...prev,
          page,
          total: data.length === pagination.perPage
            ? (page + 1) * pagination.perPage // estimation
            : page * pagination.perPage,
        }));

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    },
    [pagination.perPage]
  );

  const searchBreweries = useCallback((filters: SearchFilters) => {
    setCurrentFilters(filters);
    setPagination(prev => ({ ...prev, page: 1 }));
    fetchBreweries(filters, 1, false);
  }, [fetchBreweries]);

  const loadMore = useCallback(() => {
    const nextPage = pagination.page + 1;
    fetchBreweries(currentFilters, nextPage, true);
  }, [fetchBreweries, currentFilters, pagination.page]);

  const refresh = useCallback(() => {
    fetchBreweries(currentFilters, pagination.page, false);
  }, [fetchBreweries, currentFilters, pagination.page]);

  const setPage = useCallback((page: number) => {
    setPagination(prev => ({ ...prev, page }));
    fetchBreweries(currentFilters, page, false);
  }, [fetchBreweries, currentFilters]);

  useEffect(() => {
    fetchBreweries({ query: '' }, 1, false);
  }, []);

  return {
    breweries,
    loading,
    error,
    pagination,
    searchBreweries,
    loadMore,
    refresh,
    setPage,
  };
};
