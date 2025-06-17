const API_BASE_URL = 'https://backend.gcodevs.com.br/';

export const fetchPortfolioItems = async () => {
  const response = await fetch(`${API_BASE_URL}/items`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};