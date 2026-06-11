import { fetchPortfolioItems, ApiError, checkApiHealth } from '../api';
import { validatePortfolioItems } from '../../types/portfolio';

const mockItems = [
  {
    id: '1',
    title: 'Projeto Oculto',
    imageUrl: '/img/hidden.png',
    description: 'Este projeto deve ser filtrado pela HIDDEN_PORTFOLIO_IDS',
    githubUrl: 'https://github.com/teste/hidden',
    technologies: ['React'],
    category: 'frontend',
    featured: false
  },
  {
    id: '2',
    title: 'Projeto Visível',
    imageUrl: '/img/visible.png',
    description: 'Este projeto deve aparecer normalmente',
    githubUrl: 'https://github.com/teste/visible',
    technologies: ['React', 'TypeScript'],
    category: 'frontend',
    featured: true
  }
];

jest.mock('../../data/portfolio.json', () => ({
  items: [
    {
      id: 1,
      title: 'Projeto Oculto',
      imageUrl: '/img/hidden.png',
      description: 'Este projeto deve ser filtrado pela HIDDEN_PORTFOLIO_IDS',
      githubUrl: 'https://github.com/teste/hidden',
      technologies: ['React'],
      category: 'frontend',
      featured: false
    },
    {
      id: 2,
      title: 'Projeto Visível',
      imageUrl: '/img/visible.png',
      description: 'Este projeto deve aparecer normalmente',
      githubUrl: 'https://github.com/teste/visible',
      technologies: ['React', 'TypeScript'],
      category: 'frontend',
      featured: true
    }
  ]
}));

jest.mock('../../types/portfolio', () => ({
  validatePortfolioItems: jest.fn()
}));

const mockValidatePortfolioItems = jest.mocked(validatePortfolioItems);

describe('API Service (dados locais)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchPortfolioItems', () => {
    it('deve retornar itens validados a partir do portfolio.json local', async () => {
      mockValidatePortfolioItems.mockReturnValue(mockItems);

      const result = await fetchPortfolioItems();

      expect(mockValidatePortfolioItems).toHaveBeenCalledTimes(1);
      // O item com id "1" está em HIDDEN_PORTFOLIO_IDS e deve ser filtrado
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('2');
    });

    it('deve lançar ApiError quando a validação falhar', async () => {
      mockValidatePortfolioItems.mockImplementation(() => {
        throw new Error('Formato inválido');
      });

      await expect(fetchPortfolioItems()).rejects.toThrow(ApiError);
    });
  });

  describe('checkApiHealth', () => {
    it('deve sempre retornar true (dados locais)', async () => {
      const result = await checkApiHealth();
      expect(result).toBe(true);
    });
  });
});
