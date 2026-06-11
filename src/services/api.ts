import portfolioStatic from '../data/portfolio.json';
import {
  PortfolioItem,
  validatePortfolioItems
} from '../types/portfolio';

/**
 * IDs ocultos da vitrine.
 * - '1': projeto descontinuado.
 * - '5': IPF Farol — aguardando deploy do termômetro; remover daqui quando o site estiver no ar.
 */
const HIDDEN_PORTFOLIO_IDS = new Set(['1', '5']);

// Mantemos a classe ApiError exportada para preservar contratos do hook usePortfolio
// e dos ErrorBoundaries, que diferenciam erros de API de erros genéricos.
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public originalError?: Error
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Carrega os itens do portfólio a partir de `portfolio.json` empacotado no bundle.
 * Sem chamadas de rede: evita CORS, indisponibilidade do backend e simplifica o deploy.
 */
export const fetchPortfolioItems = async (): Promise<PortfolioItem[]> => {
  try {
    const rawItems = (portfolioStatic as { items: unknown[] }).items;
    const validatedItems = validatePortfolioItems(rawItems);
    return validatedItems
      .filter((item) => !HIDDEN_PORTFOLIO_IDS.has(String(item.id)))
      .sort((a, b) => Number(a.id) - Number(b.id));
  } catch (error) {
    console.error('Erro ao carregar itens do portfólio:', error);
    throw new ApiError(
      'Falha ao carregar dados do portfólio',
      undefined,
      error as Error
    );
  }
};

/**
 * Mantido por compatibilidade. Como os dados são locais e empacotados no build,
 * a "saúde" do serviço é sempre verdadeira.
 */
export const checkApiHealth = async (): Promise<boolean> => {
  return true;
};
