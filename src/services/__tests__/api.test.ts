import { fetchPortfolioItems, ApiError, checkApiHealth } from '../api';
import { validatePortfolioItems } from '../../types/portfolio';

// Mock da validação
jest.mock('../../types/portfolio', () => ({
  validatePortfolioItems: jest.fn(),
}));

const mockValidatePortfolioItems = jest.mocked(validatePortfolioItems);

// Mock do fetch global
global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;

describe('API Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchPortfolioItems', () => {
    it('deve buscar dados com sucesso', async () => {
      const mockData = [{ id: '1', title: 'Test' }];
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue(mockData)
      };

      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);
      mockValidatePortfolioItems.mockReturnValue(mockData);

      const result = await fetchPortfolioItems();

      expect(global.fetch).toHaveBeenCalledWith(
        'https://backend.gcodevs.com.br/items',
        expect.objectContaining({
          headers: { 'Content-Type': 'application/json' }
        })
      );
      expect(mockValidatePortfolioItems).toHaveBeenCalledWith(mockData);
      expect(result).toEqual(mockData);
    });

    it('deve lançar ApiError para resposta HTTP não ok', async () => {
      const mockResponse = {
        ok: false,
        status: 404,
        statusText: 'Not Found'
      };

      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      await expect(fetchPortfolioItems()).rejects.toThrow(ApiError);
    });

    it('deve lançar ApiError se validação falhar', async () => {
      const mockData = [{ id: '1', title: 'Test' }];
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue(mockData)
      };

      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);
      mockValidatePortfolioItems.mockImplementation(() => {
        throw new Error('Validation error');
      });

      await expect(fetchPortfolioItems()).rejects.toThrow(ApiError);
    });
  });

  describe('checkApiHealth', () => {
    it('deve retornar true se API estiver saudável', async () => {
      const mockResponse = {
        ok: true
      };

      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      const result = await checkApiHealth();

      expect(result).toBe(true);
    });

    it('deve retornar false se API não estiver saudável', async () => {
      const mockResponse = {
        ok: false
      };

      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      const result = await checkApiHealth();

      expect(result).toBe(false);
    });

    it('deve retornar false em caso de erro', async () => {
      (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

      const result = await checkApiHealth();

      expect(result).toBe(false);
    });
  });
}); 