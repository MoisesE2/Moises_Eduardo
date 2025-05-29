const API_BASE_URL = 'https://api-json-nd09.onrender.com';

export const fetchPortfolioItems = async () => {
  const response = await fetch(`${API_BASE_URL}/items`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};