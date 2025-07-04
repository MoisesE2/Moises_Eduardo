import { PortfolioItem, validatePortfolioItems } from '../types/portfolio';

const API_BASE_URL = 'https://backend.gcodevs.com.br';

// Configurações de retry
const RETRY_CONFIG = {
  maxRetries: 3,
  retryDelay: 1000, // 1 segundo
  backoffMultiplier: 2
};

// Função para delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Classe para erros customizados da API
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

// Função auxiliar para fazer requisições com retry
async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  retryCount = 0
): Promise<Response> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

  if (!response.ok) {
      throw new ApiError(
        `HTTP Error: ${response.status} - ${response.statusText}`,
        response.status
      );
    }

    return response;
  } catch (error) {
    if (retryCount < RETRY_CONFIG.maxRetries) {
      const delayTime = RETRY_CONFIG.retryDelay * Math.pow(RETRY_CONFIG.backoffMultiplier, retryCount);
      console.warn(`Tentativa ${retryCount + 1} falhou. Tentando novamente em ${delayTime}ms...`);
      await delay(delayTime);
      return fetchWithRetry(url, options, retryCount + 1);
    }
    
    throw error instanceof ApiError 
      ? error 
      : new ApiError('Falha na requisição à API', undefined, error as Error);
  }
}

// Função principal para buscar itens do portfólio
export const fetchPortfolioItems = async (): Promise<PortfolioItem[]> => {
  try {
    const response = await fetchWithRetry(`${API_BASE_URL}/items`);
    const data = await response.json();
    
    // Validar os dados recebidos
    const validatedItems = validatePortfolioItems(data);
    
    return validatedItems;
  } catch (error) {
    console.error('Erro ao buscar itens do portfólio:', error);
    
    if (error instanceof ApiError) {
      throw error;
    }
    
    throw new ApiError('Falha ao carregar dados do portfólio', undefined, error as Error);
  }
};

// Função para verificar se a API está disponível
export const checkApiHealth = async (): Promise<boolean> => {
  try {
    const response = await fetchWithRetry(`${API_BASE_URL}/`, {}, 0);
    return response.ok;
  } catch {
    return false;
  }
};