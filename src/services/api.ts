const API_BASE_URL = 'http://localhost:3001';

export const fetchPortfolioItems = async () => {
  const response = await fetch(`${API_BASE_URL}/portfolio`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};