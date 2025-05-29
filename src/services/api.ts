const API_BASE_URL = 'https://api-json-28qo.onrender.com';

export const fetchPortfolioItems = async () => {
  const response = await fetch(`${API_BASE_URL}/portfolio`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};