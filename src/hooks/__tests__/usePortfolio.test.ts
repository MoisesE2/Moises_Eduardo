import { renderHook, waitFor } from '@testing-library/react';
import usePortfolio from '../usePortfolio';

// Mock do serviço API
jest.mock('../../services/api', () => ({
  fetchPortfolioItems: jest.fn(),
  ApiError: class MockApiError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'ApiError';
    }
  }
}));

import { jest } from '@jest/globals';

const mockFetchPortfolioItems = jest.mocked(
  jest.requireActual('../../services/api') as { fetchPortfolioItems: jest.Mock }
).fetchPortfolioItems;

describe('usePortfolio', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve inicializar com loading true', () => {
    mockFetchPortfolioItems.mockImplementation(() => new Promise(() => {}));
    const { result } = renderHook(() => usePortfolio());
    
    expect(result.current.loading).toBe(true);
    expect(result.current.portfolioItems).toEqual([]);
    expect(result.current.error).toBe(null);
    expect(result.current.isApiError).toBe(false);
  });

  it('deve carregar itens do portfólio com sucesso', async () => {
    const mockData = [
      {
        id: '1',
        title: 'Projeto Test',
        imageUrl: 'https://example.com/image.jpg',
        description: 'Descrição do projeto test',
        videoUrl: 'https://example.com/video.mp4',
        githubUrl: 'https://github.com/test',
        technologies: ['React', 'TypeScript'],
        category: 'frontend',
        featured: true,
        liveUrl: 'https://example.com'
      }
    ];

    mockFetchPortfolioItems.mockResolvedValue(mockData);

    const { result } = renderHook(() => usePortfolio());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.portfolioItems).toEqual(mockData);
    expect(result.current.error).toBe(null);
    expect(result.current.isApiError).toBe(false);
  });

  it('deve lidar com erro da API', async () => {
    const { ApiError } = jest.requireActual('../../services/api') as { ApiError: new (message: string) => Error };
    const apiError = new ApiError('Erro de conexão');
    mockFetchPortfolioItems.mockRejectedValue(apiError);

    const { result } = renderHook(() => usePortfolio());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.portfolioItems).toEqual([]);
    expect(result.current.error).toBe('Erro de conexão');
    expect(result.current.isApiError).toBe(true);
  });

  it('deve lidar com erro genérico', async () => {
    const genericError = new Error('Erro genérico');
    mockFetchPortfolioItems.mockRejectedValue(genericError);

    const { result } = renderHook(() => usePortfolio());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.portfolioItems).toEqual([]);
    expect(result.current.error).toBe('Erro genérico');
    expect(result.current.isApiError).toBe(false);
  });

  it('deve permitir retry após erro', async () => {
    const { ApiError } = jest.requireActual('../../services/api') as { ApiError: new (message: string) => Error };
    const apiError = new ApiError('Erro de conexão');
    mockFetchPortfolioItems.mockRejectedValueOnce(apiError);

    const { result } = renderHook(() => usePortfolio());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe('Erro de conexão');
    });

    // Configurar sucesso para o retry
    const mockData = [
      {
        id: '1',
        title: 'Projeto Test',
        imageUrl: 'https://example.com/image.jpg',
        description: 'Descrição do projeto test',
        videoUrl: 'https://example.com/video.mp4',
        githubUrl: 'https://github.com/test',
        technologies: ['React', 'TypeScript'],
        category: 'frontend',
        featured: true,
        liveUrl: 'https://example.com'
      }
    ];
    mockFetchPortfolioItems.mockResolvedValue(mockData);

    // Executar retry
    result.current.retry();

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(null);
      expect(result.current.portfolioItems).toEqual(mockData);
    });
  });
}); 